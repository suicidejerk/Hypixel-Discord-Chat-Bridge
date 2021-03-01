const PingCommand = require('./PingCommand')
const LogEvent = require('../../LogEvent')
const GuildLobbyCommand = require('./GuildLobbyCommand')

class CommandHandler {
  constructor(minecraft) {
    this.commands = [
      {
        trigger: ['!ping'],
        handler: new PingCommand(minecraft),
      },
      {
        trigger: ['!guildlobby', '!globby'],
        handler: new GuildLobbyCommand(minecraft),
      },
    ]
    this.logEvent = new LogEvent()
  }

  handle(player, message) {
    const commandTrigger = message.toLowerCase().split(' ')[0]

    for (let command of this.commands) {
      for (let trigger of command.trigger) {
        if (trigger == commandTrigger) {
          this.runCommand(command, player, message)

          return true
        }
      }
    }

    return false
  }

  runCommand(command, player, message) {
    this.logEvent.misc(`Minecraft Command Handler > ${player} - [${command.handler.constructor.name}] ${message}`)

    command.handler.onCommand(player, message)
  }
}

module.exports = CommandHandler
