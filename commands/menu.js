module.exports = {
  name: "menu",
  execute: async ({ sock, from }) => {
    let texto = ""

    texto += "Comandos disponibles:\n\n"

    texto += "IA:\n"
    texto += " - !ia <pregunta>\n\n"

    texto += "Informacion:\n"
    texto += " - !info        (mostrar datos del bot y contacto)\n"
    texto += " - !fecha       (mostrar fecha actual)\n"
    texto += " - !hora        (mostrar hora actual)\n\n"

    texto += "Moderacion (grupo):\n"
    texto += " - !kick @usuario\n"
    texto += " - !ban @usuario\n"
    texto += " - !mute\n"
    texto += " - !unmute\n"
    texto += " - !tagall       (mencionar todos)\n"
    texto += " - Bienvenida automática (se envía al entrar un nuevo usuario)\n\n"

    texto += "Anuncios:\n"
    texto += " - !anuncio <mensaje>\n"
    texto += " - !aviso   <mensaje>\n\n"

    texto += "Diversion:\n"
    texto += " - !dado\n"
    texto += " - !chiste\n"
    texto += " - !saludo\n"
    texto += " - !abrazo\n\n"

    texto += "Usa el comando escribiendo el prefijo seguido del nombre.\n"
    texto += "Ejemplo: !chiste o !info"

    await sock.sendMessage(from, { text: texto })
  }
}
