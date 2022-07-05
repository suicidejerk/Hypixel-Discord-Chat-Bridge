const DiscordCommand = require('../../contracts/DiscordCommand')

class TypeCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      return 
    }

    this.discord.app.minecraft.bot.chat(message.content.replace('!type ', ''))

	message.react("✅");(`Message typed.`)

    return
  }
}

module.exports = TypeCommand
