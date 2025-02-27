const CommunicationBridge = require('../contracts/CommunicationBridge')
const StateHandler = require('./handlers/StateHandler')
const MessageHandler = require('./handlers/MessageHandler')
const CommandHandler = require('./CommandHandler')
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
      cacheRoles: true,
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

      process.exit(1)
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

    process.on('SIGINT', () => this.stateHandler.onClose())
  }

  onBroadcast({ username, message, guildRank }) {
    this.app.log.broadcast(`${username} [${guildRank}]: ${message}`, `Discord`)
    switch (this.app.config.discord.messageMode.toLowerCase()) {
      case 'bot':
        this.app.discord.client.channels.fetch(this.app.config.discord.channel).then(channel => {
          channel.send({
            embed: {
              description: message,
              color: '6495ED',
              timestamp: new Date(),
              footer: {
                text: guildRank,
              },
              author: {
                name: username,
                icon_url: 'https://www.mc-heads.net/avatar/' + username,
              },
            },
          })
        })
        break

      case 'webhook':
        message = message.replace(/@/g, '') // Stop pinging @everyone or @here
        this.app.discord.webhook.send(
          message, { username: username, avatarURL: 'https://www.mc-heads.net/avatar/' + username }
        )
        break

      default:
        throw new Error('Invalid message mode: must be bot or webhook')
    }
  }

  onBroadcastCleanEmbed({ message, color }) {
    this.logEvent.discord(`${username}: ${message}`)

    this.app.discord.client.channels.fetch(this.app.config.discord.channel).then(channel => {
      channel.send({
        embed: {
          color: color,
          description: message,
        }
      })
    })
  }

  onBroadcastHeadedEmbed({ message, title, icon, color }) {
    this.app.log.broadcast(message, 'Event')

    this.app.discord.client.channels.fetch(this.app.config.discord.channel).then(channel => {
      channel.send({
        embed: {
          color: color,
          author: {
            name: title,
            icon_url: icon,
          },
          description: message,
        }
      })
    })
  }

  onPlayerToggle({ username, message, color }) {
    this.app.log.broadcast(username + ' ' + message, 'Event')

    switch (this.app.config.discord.messageMode.toLowerCase()) {
      case 'bot':
        this.app.discord.client.channels.fetch(this.app.config.discord.channel).then(channel => {
          channel.send({
            embed: {
              color: color,
              timestamp: new Date(),
              author: {
                name: `${username} ${message}`,
                icon_url: 'https://www.mc-heads.net/avatar/' + username,
              },
            }
          })
        })
        break

      case 'webhook':
        this.app.discord.webhook.send({
          username: username, avatarURL: 'https://www.mc-heads.net/avatar/' + username, embeds: [{
            color: color,
            description: `${username} ${message}`,
          }]
        })
        break

      default:
        throw new Error('Invalid message mode: must be bot or webhook')
    }
  }
}

module.exports = DiscordManager
