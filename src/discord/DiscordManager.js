const config = require('../../config.json')
const CommunicationBridge = require('../contracts/CommunicationBridge')
const StateHandler = require('./handlers/StateHandler')
const MessageHandler = require('./handlers/MessageHandler')
const CommandHandler = require('./commands/CommandHandler')
const Discord = require('discord.js-light')
const LogEvent = require('../LogEvent')

class DiscordManager extends CommunicationBridge {
  constructor(app) {
    super()

    this.app = app

    this.stateHandler = new StateHandler(this)
    this.messageHandler = new MessageHandler(this, new CommandHandler(this))
    this.logEvent = new LogEvent()
  }

  connect() {
    this.client = new Discord.Client({
      cacheGuilds: true,
      cacheChannels: true,
      cacheOverwrites: false,
      cacheRoles: false,
      cacheEmojis: false,
      cachePresences: false,
    })

    this.client.on('ready', () => {
      this.stateHandler.onReady()

      // Notify chat bridge is on
      this.client.channels.fetch(config.discord.channel).then(channel => {
        channel.send({
          embed: {
            description: 'Chat Bridge is ON',
            color: 46080,
            timestamp: new Date(),
            author: {
              name: this.client.user.username,
              icon_url: this.client.user.avatarURL()
            }
          }
        })
      })
    })
    this.client.on('message', message => this.messageHandler.onMessage(message))

    this.client.login(config.discord.token).catch(error => {
      this.logEvent.error('Discord Bot Error: ', error)
    })

    // Notify chat bridge is off
    process.on('SIGINT', () => {
      this.client.channels.fetch(config.discord.channel).then(channel => {
        channel.send({
          embed: {
            description: 'Chat Bridge is OFF',
            color: 11796480,
            timestamp: new Date(),
            author: {
              name: this.client.user.username,
              icon_url: this.client.user.avatarURL()
            }
          }
        }).then(() => { process.exit() }
        )
      })
    })

    process.on('uncaughtException', () => {
      this.client.channels.fetch(config.discord.channel).then(channel => {
        channel.send({
          embed: {
            description: 'Chat Bridge is OFF',
            color: 11796480,
            timestamp: new Date(),
            author: {
              name: this.client.user.username,
              icon_url: this.client.user.avatarURL()
            }
          }
        }).then(() => { process.exit() }
        )
      })
    })
  }

  onBroadcast({ username, message }) {
    this.client.channels.fetch(config.discord.channel).then(channel => {
      this.logEvent.discord(`${username}: ${message}`)

      try {
        channel.send({
          embed: {
            description: message,
            color: 8311585,
            timestamp: new Date(),
            footer: {
              text: 'Message was sent',
            },
            author: {
              name: username,
              icon_url: 'https://www.mc-heads.net/avatar/' + username,
            },
          },
        })
      } catch (err) { }
    })
  }
}

module.exports = DiscordManager
