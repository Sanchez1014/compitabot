module.exports = {
  name: "mute",
  execute: async ({ sock, from }) => {
    await sock.groupSettingUpdate(from, "announcement")
    await sock.sendMessage(from, { text: "Grupo silenciado (solo admins pueden enviar mensajes)" })
  }
}
