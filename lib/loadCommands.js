const fs = require("fs")
const path = require("path")

function loadCommands(dir = path.join(__dirname, "../commands")) {
  let commands = []

  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file)

    if (fs.statSync(fullPath).isDirectory()) {
      commands = commands.concat(loadCommands(fullPath))
    } else if (file.endsWith(".js")) {
      commands.push(require(fullPath))
    }
  }

  return commands
}

module.exports = loadCommands
