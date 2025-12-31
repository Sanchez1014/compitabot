const fs = require("fs")
const path = require("path")
const settingsFile = path.join(__dirname, "../../lib/groupSettings.json")

function loadSettings() {
  if (!fs.existsSync(settingsFile)) fs.writeFileSync(settingsFile, "{}")
  return JSON.parse(fs.readFileSync(settingsFile))
}

function saveSettings(settings) {
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2))
}

module.exports = {
  name: "bienvenida",

  execute: async ({ sock, from, args }) => {
    const settings = loadSettings()
    if (!settings[from]) settings[from] = { welcome: false, goodbye: false }

    const option = args[0]?.toLowerCase()
    if (option === "on") {
      settings[from].welcome = true
      saveSettings(settings)
      await sock.sendMessage(from, { text: "✅ Bienvenida automática ACTIVADA" })
    } else if (option === "off") {
      settings[from].welcome = false
      saveSettings(settings)
      await sock.sendMessage(from, { text: "❌ Bienvenida automática DESACTIVADA" })
    } else {
      await sock.sendMessage(from, { text: "Uso: !bienvenida on/off" })
    }
  },

  onGroupUpdate: async ({ sock, update }) => {
    if (update.action !== "add") return

    const settings = loadSettings()
    const group = update.id

    if (!settings[group]?.welcome) return

    const metadata = await sock.groupMetadata(group)
    const groupName = metadata.subject

    for (const user of update.participants) {
      // ⚡ corregido: enviar correctamente la mención
      await sock.sendMessage(group, {
        text: `👋 Bienvenido/a @${user.split("@")[0]} al grupo *${groupName}*`,
        mentions: [user]
      })
    }
  }
}
