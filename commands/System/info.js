module.exports = {
  name: "info",
  execute: async ({ sock, from }) => {
    try {
      const botName = "COMPITA BOT"
      const rentUSD = 5

      // Tipo de cambio aproximado
      const usdToMxn = 17.84
      const rentMXN = (rentUSD * usdToMxn).toFixed(2)

      const contacto = "+18186743565"

      let text = ""
      text += "Bot Name: " + botName + "\n"
      text += "Precio de renta: " + rentUSD + " USD\n"
      text += "Precio de renta en pesos: " + rentMXN + " MXN\n"
      text += "Contacto: " + contacto

      await sock.sendMessage(from, { text })
    } catch {
      await sock.sendMessage(from, { text: "Error al obtener la informacion" })
    }
  }
}
