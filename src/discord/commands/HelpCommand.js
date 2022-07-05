const DiscordCommand = require('../../contracts/DiscordCommand')

class HelpCommand extends DiscordCommand {
  onCommand(message) {
    message.reply(
      [
        '`<>` = Required arguments, `[]` Optional arguments',
        '**Command List**',
        '`!help` - Displays this command list',
        '`!relog [delay]` - Relogs the MC client, a delay can be given in seconds, if no delay is given it will default to 5 seconds.',
        '`!type <string>` - Types that in chat without /gc (please dont be bad).',
      ].join('\n')
    )
  }
}

module.exports = HelpCommand
