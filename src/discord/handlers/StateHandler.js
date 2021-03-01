const LogEvent = require('../../LogEvent')

class StateHandler {
  constructor(discord) {
    this.discord = discord
    this.logEvent = new LogEvent()
  }

  onReady() {
    this.logEvent.misc('Discord client ready, logged in as ' + this.discord.client.user.tag)
  }
}

module.exports = StateHandler
