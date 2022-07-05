const config = require('../../../config.json')
const RelogCommand = require('./RelogCommand')
const HelpCommand = require('./HelpCommand')
const TypeCommand = require('./TypeCommand')
const LogEvent = require('../../LogEvent')

class CommandHandler {
  constructor(discord) {
    this.commands = [
	{
        trigger: ['!type', '!t'],
        handler: new TypeCommand(discord),
      },
      {
        trigger: ['!relog', '!r'],
        handler: new RelogCommand(discord),
      },
      {
        trigger: ['!help', '!h'],
        handler: new HelpCommand(discord),
      },
    ]
    this.logEvent = new LogEvent()
  }

  handle(message) {
    const commandTrigger = message.content.toLowerCase().split(' ')[0]

    for (let command of this.commands) {
      for (let trigger of command.trigger) {
        if (trigger == commandTrigger) {
          this.runCommand(command, message)

          return true
        }
      }
    }

    return false
  }

  runCommand(command, message) {
    if (!this.isCommander(message.member)) {
      return message.reply("You're not allowed to run this command!")
    }

    this.logEvent.misc(`[${command.handler.constructor.name} - ${message.author.username}#${message.author.discriminator}] ${message.content} `)

    command.handler.onCommand(message)
  }

  isCommander(member) {
    return member.roles.cache.find(r => r.id == config.discord.commandRole)
  }
}

module.exports = CommandHandler
