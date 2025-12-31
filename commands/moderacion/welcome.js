module.exports = {
  name: "welcome",

  // Función que se ejecuta automáticamente cuando hay cambios en el grupo
  onGroupUpdate: async ({ sock, update }) => {
    // Solo continuar si se agregan participantes
    if (update.action !== "add") return

    // Obtener metadata del grupo para el nombre
    const metadata = await sock.groupMetadata(update.id)
    const groupName = metadata.subject

    // Enviar mensaje de bienvenida a cada nuevo participante
    for (const user of update.participants) {
      await sock.sendMessage(update.id, {
        text: `👋 Bienvenido/a @${user.split("@")[0]} al grupo *${groupName}*.\n\nPor favor, lee las reglas y disfruta tu estadía!`,
        mentions: [user]
      })
    }
  }
}
