module.exports = {
  name: "fecha",
  execute: async ({ sock, from }) => {
    await sock.sendMessage(from, { text: new Date().toLocaleDateString() })
  }
}
