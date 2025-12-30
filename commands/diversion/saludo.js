module.exports = {
  name: "saludo",
  execute: async ({ sock, from }) => {
    await sock.sendMessage(from, { text: "Hola" })
  }
}
