module.exports = {
  name: "ban",
  execute: async ({ sock, from, m }) => {
    const user = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    if (!user) return sock.sendMessage(from, { text: "Menciona a alguien para banear" })

    await sock.groupParticipantsUpdate(from, [user], "remove")
    await sock.sendMessage(from, { text: "Usuario baneado" })
  }
}
