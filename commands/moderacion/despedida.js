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
  name: "despedida",

  execute: async ({ sock, from, args }) => {
    const settings = loadSettings()

    if (!settings[from]) settings[from] = { welcome: false, goodbye: false }

    const option = args[0]?.toLowerCase()
    if (option === "on") {
      settings[from].goodbye = true
      saveSettings(settings)
      await sock.sendMessage(from, { text: "✅ Despedida automática ACTIVADA" })
    } else if (option === "off") {
      settings[from].goodbye = false
      saveSettings(settings)
      await sock.sendMessage(from, { text: "❌ Despedida automática DESACTIVADA" })
    } else {
      await sock.sendMessage(from, { text: "Uso: !despedida on/off" })
    }
  },

  onGroupUpdate: async ({ sock, update }) => {
    if (update.action !== "remove") return

    const settings = loadSettings()
    const group = update.id
    if (!settings[group]?.goodbye) return

    const metadata = await sock.groupMetadata(group)
    const groupName = metadata.subject

    for (const user of update.participants) {
      await sock.sendMessage(group, {
        text: `👋 @${user.split("@")[0]} ha salido del grupo *${groupName}*`,
        mentions: [user]
      })
    }
  }
}
