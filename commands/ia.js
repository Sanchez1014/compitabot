const OpenAI = require("openai")
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

module.exports = {
  name: "ia",
  execute: async ({ sock, from, args }) => {
    if (!args.length) {
      return sock.sendMessage(from, { text: "Uso: !ia <pregunta>" })
    }

    try {
      const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: args.join(" ") }]
      })

      await sock.sendMessage(from, { text: res.choices[0].message.content })
    } catch (err) {
      await sock.sendMessage(from, { text: "Error al usar IA" })
    }
  }
}
