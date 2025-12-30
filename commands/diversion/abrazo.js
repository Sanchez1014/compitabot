module.exports = {
  name: "abrazo",
  execute: async ({ sock, from }) => {
    await sock.sendMessage(from, { text: "Te envio un abrazo" })
  }
}
