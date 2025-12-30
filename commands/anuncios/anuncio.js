module.exports = {
  name: "anuncio",
  execute: async ({ sock, from, args }) => {
    if (!args.length) return sock.sendMessage(from, { text: "Uso: !anuncio <mensaje>" })
    await sock.sendMessage(from, { text: "ANUNCIO\n\n" + args.join(" ") })
  }
}
