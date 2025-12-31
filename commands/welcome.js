module.exports = {
  name: "welcome",

  async onGroupUpdate({ sock, update }) {
    if (update.action !== "add") return

    const groupMetadata = await sock.groupMetadata(update.id)
    const groupName = groupMetadata.subject

    for (let user of update.participants) {
      await sock.sendMessage(update.id, {
        text: `👋 Bienvenido/a @${user.split("@")[0]}

📌 Grupo: *${groupName}*
📖 Lee las reglas y disfruta tu estadía 🤝`,
        mentions: [user]
      })
    }
  }
}
