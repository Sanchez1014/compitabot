module.exports = {
  name: "chiste",
  execute: async ({ sock, from }) => {
    const chistes = [
      "¿Qué le dijo un jaguar a otro jaguar? Jaguar you", 
      "¿Por qué lloraba el libro de matemáticas? Porque tenía muchos problemas", 
      "¿Qué le dice una taza a otra? ¿Qué taza ciendo?", 
      "¿Cómo se llama un pan sin sal? Pan sin sal", 
      "¿Qué le dijo un mosquito a un grupo? No aplaudan que falta para mi cumpleaños", 
      "¿Cuál es la fruta más divertida? La naranja ja, ja", 
      "¿Cómo se dice espejo en chino? Aitoiyo", 
      "¿Por qué los gatos siempre están enojados? Porque siempre están en la cola", 
      "¿Qué dijo el perro en la arena caliente? Me estoy quemando los huesos", 
      "¿Por qué los programadores odian la naturaleza? Porque tiene muchos bugs"
    ]

    const random = chistes[Math.floor(Math.random() * chistes.length)]
    await sock.sendMessage(from, { text: random })
  }
}
