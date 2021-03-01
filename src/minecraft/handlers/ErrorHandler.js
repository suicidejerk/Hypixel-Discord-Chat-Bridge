const EventHandler = require('../../contracts/EventHandler')
const LogEvent = require('../../LogEvent')

class StateHandler extends EventHandler {
  registerEvents(bot) {
    this.bot = bot
    this.logEvent = new LogEvent()

    this.bot.on('error', (...args) => this.onError(...args))
  }

  onError(error) {
    if (this.isConnectionResetError(error)) {
      return
    }

    if (this.isConnectionRefusedError(error)) {
      return this.logEvent.error('Connection refused while attempting to login via the Minecraft client')
    }

    this.logEvent.error('Minecraft Bot Error: ' + error)
  }

  isConnectionResetError(error) {
    return error.hasOwnProperty('code') && error.code == 'ECONNRESET'
  }

  isConnectionRefusedError(error) {
    return error.hasOwnProperty('code') && error.code == 'ECONNREFUSED'
  }
}

module.exports = StateHandler
