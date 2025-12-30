module.exports = {
  name: "tagall",
  execute: async ({ sock, from }) => {
    const meta = await sock.groupMetadata(from)
    const users = meta.participants.map(p => p.id)

    await sock.sendMessage(from, {
      text: users.map(u => "@" + u.split("@")[0]).join(" "),
      mentions: users
    })
  }
}
