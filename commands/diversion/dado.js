module.exports = {
  name: "dado",
  execute: async ({ sock, from }) => {
    const n = Math.floor(Math.random() * 6) + 1
    await sock.sendMessage(from, { text: "Resultado: " + n })
  }
}
