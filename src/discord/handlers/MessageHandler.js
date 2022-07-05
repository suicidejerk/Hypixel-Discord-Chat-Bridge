const config = require('../../../config.json')
const profanityFilter = require('leo-profanity')

class MessageHandler {
  constructor(discord, command) {
    this.discord = discord
    this.command = command
  }

  async onMessage(message) {
    if (!this.shouldBroadcastMessage(message)) {
      return
    }

    if (this.command.handle(message)) {
      return
    }

    const content = this.stripDiscordContent(message.content).trim()
    if (content.length == 0) {
      return
    }

    this.discord.broadcastMessage({
      username: config.discord.profanityFilter ? (profanityFilter.clean(message.member.displayName.replace(/:/g, "¦"))).substring(0, 30) : (message.member.displayName.replace(/:/g, "¦")).substring(0, 30),
      message: config.discord.profanityFilter ? (profanityFilter.clean(this.stripDiscordContent(message.content))).substring(0, 200) : (this.stripDiscordContent(message.content)).substring(0, 200),
      replyingTo: await this.fetchReply(message),
    })
  }

  async fetchReply(message) {
    try {
      if (!message.reference) return null

      const reference = await message.channel.messages.fetch(message.reference.messageID)

      return reference.member ? reference.member.displayName : reference.author.username
    } catch (e) {
      return null
    }
  }

  stripDiscordContent(message) {
    return message
      .replace(/<[@|#|!|&]{1,2}(\d+){16,}>/g, '\n')
      .replace(/<:\w+:(\d+){16,}>/g, '\n')
      .replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, '\n')
      .split('\n')
      .map(part => {
        part = part.trim()

        return part.length == 0 ? '' : part + ' '
      })
      .join('')
  }

  shouldBroadcastMessage(message) {
    return !message.author.bot && message.channel.id == this.discord.app.config.discord.channel && message.content && message.content.length > 0
  }
}

module.exports = MessageHandler
