module.exports = {
  name: "welcome",

  async onGroupUpdate({ sock, update }) {
    // Solo continuar si se agregan participantes
    if (update.action !== "add") return

    // Obtener metadata del grupo para obtener nombre
    const metadata = await sock.groupMetadata(update.id)
    const groupName = metadata.subject

    // Enviar mensaje de bienvenida a cada nuevo participante
    for (const user of update.participants) {
      await sock.sendMessage(update.id, {
        text: `👋 Bienvenido/a @${user.split("@")[0]} al grupo *${groupName}*.

Por favor, lee las reglas y disfruta tu estadía!`,
        mentions: [user]
      })
    }
  }
}
