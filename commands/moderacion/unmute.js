module.exports = {
  name: "unmute",
  execute: async ({ sock, from }) => {
    await sock.groupSettingUpdate(from, "not_announcement")
    await sock.sendMessage(from, { text: "Grupo activado (todos pueden escribir)" })
  }
}
