module.exports = {
  name: "kick",
  execute: async ({ sock, from, m, sender }) => {
    const user = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    if (!user) return sock.sendMessage(from, { text: "Menciona a alguien para expulsar" })

    await sock.groupParticipantsUpdate(from, [user], "remove")
    await sock.sendMessage(from, { text: "Usuario expulsado" })
  }
}
