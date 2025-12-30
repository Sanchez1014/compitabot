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

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0]
    if (!m.message || m.key.fromMe) return

    const from = m.key.remoteJid
    const sender = m.key.participant || from

    // Obtener texto del mensaje de forma segura
    const text =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      ""

    // Si no empieza con el prefix no hacer nada
    if (!text.startsWith(PREFIX)) return

    // Separar comando y argumentos
    const args = text.slice(PREFIX.length).trim().split(/ +/)
    const cmdName = args.shift().toLowerCase()

    // Buscar comando en el array cargado
    const command = commands.find(c => c.name === cmdName)
    if (!command) {
      return sock.sendMessage(from, { text: "Comando no reconocido. Usa !menu" })
    }

    try {
      // Ejecutar comando pasando contexto
      await command.execute({ sock, m, from, sender, args })
    } catch (err) {
      console.error(err)
      await sock.sendMessage(from, { text: "Error al ejecutar el comando" })
    }
  })
}

startBot()
