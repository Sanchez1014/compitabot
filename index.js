const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const Pino = require("pino")
const qrcode = require("qrcode-terminal")
require("dotenv").config()

const { PREFIX, OWNER, ADMIN } = require("./config")
const loadCommands = require("./lib/loadCommands")
const commands = loadCommands()

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth")

  const sock = makeWASocket({
    auth: state,
    logger: Pino({ level: "silent" })
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", ({ qr, connection }) => {
    if (qr) {
      console.log("Escanea el codigo QR")
      qrcode.generate(qr, { small: true })
    }
    if (connection === "open") console.log("Bot conectado")
    if (connection === "close") startBot()
  })

  // ===============================
  // 📌 EVENTOS DE GRUPO (BIENVENIDA)
  // ===============================
  sock.ev.on("group-participants.update", async (update) => {
    try {
      for (const cmd of commands) {
        if (typeof cmd.onGroupUpdate === "function") {
          await cmd.onGroupUpdate({ sock, update })
        }
      }
    } catch (err) {
      console.error("Error en evento de grupo:", err)
    }
  })

  // ===============================
  // 📩 COMANDOS POR MENSAJE
  // ===============================
  sock.ev.on("messages.upsert", async ({ messages }) => {

    const m = messages[0]
    if (!m.message || m.key.fromMe) return

    const from = m.key.remoteJid
    const sender = m.key.participant || from

    const text =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      ""

    if (!text.startsWith(PREFIX)) return

    const args = text.slice(PREFIX.length).trim().split(/ +/)
    const cmdName = args.shift().toLowerCase()

    const command = commands.find(c => c.name === cmdName)
    if (!command) {
      return sock.sendMessage(from, { text: "Comando no reconocido. Usa !menu" })
    }

    try {
      await command.execute({ sock, m, from, sender, args })
    } catch (err) {
      console.error(err)
      await sock.sendMessage(from, { text: "Error al ejecutar el comando" })
    }
  })
}

startBot()
