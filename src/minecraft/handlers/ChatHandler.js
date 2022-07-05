const fetch = require("node-fetch")
const EventHandler = require('../../contracts/EventHandler')
const CommandHandler = require('../commands/CommandHandler')
const LogEvent = require('../../LogEvent')
const CONFIG = require('../../../config.json')
const EMOJIS = [
  "( ͡° ͜ʖ ͡°)",
  "¯\\_(ツ)_/¯",
  "̿̿ ̿̿ ̿̿ ̿'̿'|З= ( ▀ ͜͞ʖ▀) =Ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿",
  "▄︻̷̿┻̿═━一",
  "( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)",
  "ʕ•ᴥ•ʔ",
  "(▀̿Ĺ̯▀̿ ̿)",
  "(ง ͠° ͟ل͜ ͡°)ง",
  "༼ つ ◕_◕ ༽つ",
  "ಠ_ಠ",
  "(づ｡◕‿‿◕｡)づ",
  "̿'̿'|З=( ͠° ͟ʖ ͡°)=Ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿",
  "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ✧ﾟ･: *ヽ(◕ヮ◕ヽ)",
  "[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]",
  "┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴",
  "( ͡°╭͜ʖ╮͡° )",
  "(͡ ͡° ͜ つ ͡͡°)",
  "(• Ε •)",
  "(ง'̀-'́)ง",
  "(ಥ﹏ಥ)",
  "﴾͡๏̯͡๏﴿ O'RLY?",
  "(ノಠ益ಠ)ノ彡┻━┻",
  "[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]",
  "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
  "(☞ﾟ∀ﾟ)☞",
  "| (• ◡•)| (❍ᴥ❍Ʋ)",
  "(◕‿◕✿)",
  "(ᵔᴥᵔ)",
  "(╯°□°)╯︵ ꞰOOQƎƆⱯɟ",
  "(¬‿¬)",
  "(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)",
  "(づ￣ ³￣)づ",
  "ლ(ಠ益ಠლ)",
  "ಠ╭╮ಠ",
  "̿ ̿ ̿'̿'|З=(•_•)=Ε/̵͇̿̿/'̿'̿ ̿",
  "/╲╭( ͡° ͡° ͜ʖ ͡° ͡°)╮╱",
  "(;´༎ຶД༎ຶ`)",
  "♪~ ᕕ(ᐛ)ᕗ",
  "♥‿♥",
  "༼ つ ͡° ͜ʖ ͡° ༽つ",
  "༼ つ ಥ_ಥ ༽つ",
  "(╯°□°）╯︵ ┻━┻",
  "( ͡ᵔ ͜ʖ ͡ᵔ )",
  "ヾ(⌐■_■)ノ♪",
  "~(˘▾˘~)",
  "◉_◉",
  "\\ (•◡•) /",
  "(~˘▾˘)~",
  "(._.) ( L: ) ( .-. ) ( :L ) (._.)",
  "༼ʘ̚ل͜ʘ̚༽",
  "༼ ºل͟º ༼ ºل͟º ༼ ºل͟º ༽ ºل͟º ༽ ºل͟º ༽",
  "┬┴┬┴┤(･_├┬┴┬┴",
  "ᕙ(⇀‸↼‶)ᕗ",
  "ᕦ(Ò_Óˇ)ᕤ",
  "┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻",
  "⚆ _ ⚆",
  "(•_•) ( •_•)>⌐■-■ (⌐■_■)",
  "(｡◕‿‿◕｡)",
  "ಥ_ಥ",
  "ヽ༼ຈل͜ຈ༽ﾉ",
  "⌐╦╦═─",
  "(☞ຈل͜ຈ)☞",
  "˙ ͜ʟ˙",
  "☜(˚▽˚)☞",
  "(•Ω•)",
  "(ง°ل͜°)ง",
  "(｡◕‿◕｡)",
  "（╯°□°）╯︵( .O.)",
  ":')",
  "┬──┬ ノ( ゜-゜ノ)",
  "(っ˘ڡ˘Σ)",
  "ಠ⌣ಠ",
  "ლ(´ڡ`ლ)",
  "(°ロ°)☝",
  "｡◕‿‿◕｡",
  "( ಠ ͜ʖರೃ)",
  "╚(ಠ_ಠ)=┐",
  "(─‿‿─)",
  "ƪ(˘⌣˘)Ʃ",
  "(；一_一)",
  "(¬_¬)",
  "( ⚆ _ ⚆ )",
  "(ʘᗩʘ')",
  "☜(⌒▽⌒)☞",
  "｡◕‿◕｡",
  "¯\\(°_O)/¯",
  "(ʘ‿ʘ)",
  "ლ,ᔑ•ﺪ͟͠•ᔐ.ლ",
  "(´・Ω・`)",
  "ಠ~ಠ",
  "(° ͡ ͜ ͡ʖ ͡ °)",
  "┬─┬ノ( º _ ºノ)",
  "(´・Ω・)っ由",
  "ಠ_ಥ",
  "Ƹ̵̡Ӝ̵̨̄Ʒ",
  "(>ლ)",
  "ಠ‿↼",
  "ʘ‿ʘ",
  "(ღ˘⌣˘ღ)",
  "ಠOಠ",
  "ರ_ರ",
  "(▰˘◡˘▰)",
  "◔̯◔",
  "◔ ⌣ ◔",
  "(✿´‿`)",
  "¬_¬",
  "ب_ب",
  "｡゜(｀Д´)゜｡",
  "(Ó Ì_Í)=ÓÒ=(Ì_Í Ò)",
  "°Д°",
  "( ﾟヮﾟ)",
  "┬─┬﻿ ︵ /(.□. ）",
  "٩◔̯◔۶",
  "≧☉_☉≦",
  "☼.☼",
  "^̮^",
  "(>人<)",
  "〆(・∀・＠)",
  "(~_^)",
  "^̮^",
  "^̮^",
  ">_>",
  "(^̮^)",
  "(/) (°,,°) (/)",
  "^̮^",
  "^̮^",
  "=U",
  "(･.◤)",
  "owo",
  "uwu",
]

class StateHandler extends EventHandler {
  constructor(minecraft, command) {
    super()

    this.minecraft = minecraft
    this.command = command
    this.logEvent = new LogEvent()

    this.inviter = 0
    this.partyLeader = 0
  }

  async registerEvents(bot) {
    this.bot = bot

    if (CONFIG.minecraft.fragRuns !== "everyone" && CONFIG.minecraft.fragRuns !== "none") {
      this.guildMembers = await this.getGuildMembers(CONFIG.minecraft.fragRuns);

      setInterval(async () => {  // Refresh it every 24h
        this.guildMembers = await this.getGuildMembers(CONFIG.minecraft.fragRuns);
      }, 86400000)
    }

    this.bot.on('message', (...args) => this.onMessage(...args))
  }

  onMessage(event) {
    const message = event.toString().trim()

    if (this.inviter) {
      if (this.isMessageJoinedParty(message)) {
        this.bot.chat("/party transfer " + this.inviter)

        this.logEvent.party("Joined party from: " + this.inviter)
        this.partyLeader = this.inviter
        this.inviter = 0

        setTimeout(() => {
          this.bot.chat(
            "/pc " + EMOJIS[Math.floor(Math.random() * (Object.keys(EMOJIS).length - 1))]
          )
        }, 1000)

        setTimeout(() => {
          this.logEvent.party("Leaving party from: " + this.partyLeader)
          this.partyLeader = 0

          this.bot.chat("/p leave")
        }, 5000)
      } else if (this.isMessageYoureInParty(message)) {
        this.logEvent.party("Can't join " + this.inviter + "'s party, already in a party with: " + this.partyLeader)
        let pastInviter = this.inviter
        this.inviter = 0

        let sorryMsg = "Sorry, I'm already in a party with " + (this.partyLeader ? this.partyLeader : "someone") + ", try in a bit! uwu"

        sorryMsg = this.addCharToString(sorryMsg, "⭍", 15);
        this.bot.chat("/msg " + pastInviter + " " + sorryMsg)
        setTimeout((pastInviter) => {
          if (this.inviter === pastInviter || this.partyLeader == 0) this.bot.chat("/p leave") // In case it gets stuck
        }, 5000)
      }
    } else {
      if (this.isPrivateMessage(message)) {
        // Get inviter
        message.indexOf(']') ? this.inviter = message.split(" ")[2].replace(':', '') : this.inviter = message.split(" ")[1].replace(':', '') // Nons
        // this.inviter = message.split(" ")[1]
        // if (this.inviter === "has") this.inviter = message.split(" ")[0].replace("-----------------------------\n", "") // Nons
  
        if (CONFIG.minecraft.fragRuns !== "none") {
          if ((CONFIG.minecraft.fragRun !== "everyone" && this.guildMembers && !this.guildMembers.has(this.inviter))) {
            setTimeout(() => {
              this.logEvent.party("Won't accept party invite from: " + this.inviter + ", since they aren't in " + CONFIG.minecraft.fragRuns)
              let sorryMsg = "Sorry, this bot is set to only accept party invites from guild members, sucks to suck! Join " + CONFIG.minecraft.fragRuns + "!"
  
              sorryMsg = this.addCharToString(sorryMsg, "⭍", 15);
              this.bot.chat("/msg " + this.inviter + " " + sorryMsg)
            }, 200)
          } else {
            this.logEvent.party("Accepting party invite from: " + this.inviter)
  
            setTimeout(() => {
              this.bot.chat("/p " + this.inviter)
            }, 200)
          }
        } else {
          setTimeout(() => {
            this.logEvent.party("Won't accept party invite from: " + this.inviter + ", since frag runs are turned off")
            let sorryMsg = "Sorry, frag runs are turned off at the moment."
  
            sorryMsg = this.addCharToString(sorryMsg, "⭍", 15);
            this.bot.chat("/msg " + this.inviter + " " + sorryMsg)
          }, 200)
        }
        return
      }
    }
    
    if (this.isLobbyJoinMessage(message)) {
      this.minecraft.app.log.minecraft('Sending Minecraft client to limbo')
      return this.bot.chat('/ac §')
    }

    if (this.isLoginMessage(message)) {
      let user = message.split('>')[1].trim().split('joined.')[0].trim()

      return this.minecraft.broadcastPlayerToggle({ username: user, message: `joined.`, color: '47F049' })
    }

    if (this.isLogoutMessage(message)) {
      let user = message.split('>')[1].trim().split('left.')[0].trim()

      return this.minecraft.broadcastPlayerToggle({ username: user, message: `left.`, color: 'F04947' })
    }

    if (this.isJoinMessage(message)) {
      let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[0]

      return this.minecraft.broadcastHeadedEmbed({
        message: `${user} joined the guild!`,
        title: `Member Joined`,
        icon: `https://mc-heads.net/avatar/${user}`,
        color: '47F049'
      })
    }

    if (this.isLeaveMessage(message)) {
      let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[0]

      return this.minecraft.broadcastHeadedEmbed({
        message: `${user} left the guild!`,
        title: `Member Left`,
        icon: `https://mc-heads.net/avatar/${user}`,
        color: 'F04947'
      })
    }

    if (this.isKickMessage(message)) {
      let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[0]

      return this.minecraft.broadcastHeadedEmbed({
        message: `${user} was kicked from the guild!`,
        title: `Member Kicked`,
        icon: `https://mc-heads.net/avatar/${user}`,
        color: 'F04947'
      })
    }

    if (this.isPromotionMessage(message)) {
      let username = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[0]
      let newRank = message.replace(/\[(.*?)\]/g, '').trim().split(' to ').pop().trim()

      return this.minecraft.broadcastCleanEmbed({ message: `${username} was promoted to ${newRank}`, color: '47F049' })
    }

    if (this.isDemotionMessage(message)) {
      let username = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[0]
      let newRank = message.replace(/\[(.*?)\]/g, '').trim().split(' to ').pop().trim()

      return this.minecraft.broadcastCleanEmbed({ message: `${username} was demoted to ${newRank}`, color: 'F04947' })
    }

    if (this.isBlockedMessage(message)) {
      let blockedMsg = message.match(/".+"/g)[0].slice(1, -1)

      return this.minecraft.broadcastCleanEmbed({ message: `Message \`${blockedMsg}\` blocked by Hypixel.`, color: 'DC143C' })
    }

    if (this.isRepeatMessage(message)) {
      return this.minecraft.broadcastCleanEmbed({ message: `You cannot say the same message twice!`, color: 'DC143C' })
    }

    if (this.isNoPermission(message)) {
      return this.minecraft.broadcastCleanEmbed({ message: `I don't have permission to do that!`, color: 'DC143C' })
    }

    if (this.isIncorrectUsage(message)) {
      return this.minecraft.broadcastCleanEmbed({ message: message.split("'").join("`"), color: 'DC143C' })
    }

    if (this.isOnlineInvite(message)) {
      let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[2]

      return this.minecraft.broadcastCleanEmbed({ message: `${user} was invited to the guild!`, color: '47F049' })
    }

    if (this.isOfflineInvite(message)) {
      let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[6].match(/\w+/g)[0]

      return this.minecraft.broadcastCleanEmbed({ message: `${user} was offline invited to the guild!`, color: '47F049' })
    }

    if (this.isFailedInvite(message)) {
      return this.minecraft.broadcastCleanEmbed({ message: message.replace(/\[(.*?)\]/g, '').trim(), color: 'DC143C' })
    }

    if (this.isGuildMuteMessage(message)) {
      let time = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[7]

      return this.minecraft.broadcastCleanEmbed({ message: `Guild Chat has been muted for ${time}`, color: 'F04947' })
    }

    if (this.isGuildUnmuteMessage(message)) {
      return this.minecraft.broadcastCleanEmbed({ message: `Guild Chat has been unmuted!`, color: '47F049' })
    }

    if (this.isUserMuteMessage(message)) {
      let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[3].replace(/[^\w]+/g, '')
      let time = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[5]

      return this.minecraft.broadcastCleanEmbed({ message: `${user} has been muted for ${time}`, color: 'F04947' })
    }

    if (this.isUserUnmuteMessage(message)) {
      let user = message.replace(/\[(.*?)\]/g, '').trim().split(/ +/g)[3]

      return this.minecraft.broadcastCleanEmbed({ message: `${user} has been unmuted!`, color: '47F049' })
    }

    if (this.isSetrankFail(message)) {
      return this.minecraft.broadcastCleanEmbed({ message: `Rank not found.`, color: 'DC143C' })
    }

    if (this.isAlreadyMuted(message)) {
      return this.minecraft.broadcastCleanEmbed({ message: `This user is already muted!`, color: 'DC143C' })
    }

    if (this.isNotInGuild(message)) {
      let user = message.replace(/\[(.*?)\]/g, '').trim().split(' ')[0]

      return this.minecraft.broadcastCleanEmbed({ message: `${user} is not in the guild.`, color: 'DC143C' })
    }

    if (this.isLowestRank(message)) {
      let user = message.replace(/\[(.*?)\]/g, '').trim().split(' ')[0]

      return this.minecraft.broadcastCleanEmbed({ message: `${user} is already the lowest guild rank!`, color: 'DC143C' })
    }

    if (this.isAlreadyHasRank(message)) {
      return this.minecraft.broadcastCleanEmbed({ message: `They already have that rank!`, color: 'DC143C' })
    }

    if (this.isTooFast(message)) {
      return this.minecraft.app.log.warn(message)
    }

    if (this.isPlayerNotFound(message)) {
      let user = message.split(' ')[8].slice(1, -1)

      return this.minecraft.broadcastCleanEmbed({ message: `Player \`${user}\` not found.`, color: 'DC143C' })
    }

    if (!this.isGuildMessage(message)) {
      if (message.includes("Guild Log")) {
        this.minecraft.broadcastMessage({
          username: this.bot.username,
          message: message,
        })
      } else {
        this.logEvent.misc(message)
      }
      return
    }

    let parts = message.split(':')
    let group = parts.shift().trim()
    let hasRank = group.endsWith(']')

    let userParts = group.split(' ')
    let username = userParts[userParts.length - (hasRank ? 2 : 1)]
    let guildRank = userParts[userParts.length - 1].replace(/[\[\]]/g, '')

    if (guildRank == username) {
      guildRank = 'Member'
    }

    if (this.isMessageFromBot(username)) {
      return
    }

    const playerMessage = parts.join(':').trim()
    if (playerMessage.length == 0 || this.command.handle(username, playerMessage)) {
      return
    }

    if (playerMessage == '@') {
      return
    }

    this.minecraft.broadcastMessage({
      username: username,
      message: playerMessage,
      guildRank: guildRank,
    })
  }

  isMessageFromBot(username) {
    return this.bot.username === username
  }

  isPrivateMessage(message) {
    return message.startsWith('From ')
  }

  isLobbyJoinMessage(message) {
    return (message.endsWith(' the lobby!') || message.endsWith(' the lobby! <<<')) && message.includes('[MVP+')
  }

  isGuildMessage(message) {
    return message.startsWith('Guild >') && message.includes(':')
  }

  isLoginMessage(message) {
    return message.startsWith('Guild >') && message.endsWith('joined.') && !message.includes(':')
  }

  isLogoutMessage(message) {
    return message.startsWith('Guild >') && message.endsWith('left.') && !message.includes(':')
  }

  isJoinMessage(message) {
    return message.includes('joined the guild!') && !message.includes(':')
  }

  isLeaveMessage(message) {
    return message.includes('left the guild!') && !message.includes(':')
  }

  isKickMessage(message) {
    return message.includes('was kicked from the guild by') && !message.includes(':')
  }

  isPromotionMessage(message) {
    return message.includes('was promoted from') && !message.includes(':')
  }

  isDemotionMessage(message) {
    return message.includes('was demoted from') && !message.includes(':')
  }

  isBlockedMessage(message) {
    return message.includes('We blocked your comment') && !message.includes(':')
  }

  isRepeatMessage(message) {
    return message == 'You cannot say the same message twice!'
  }

  isNoPermission(message) {
    return (message.includes('You must be the Guild Master to use that command!') || message.includes('You do not have permission to use this command!') || message.includes("I'm sorry, but you do not have permission to perform this command. Please contact the server administrators if you believe that this is in error.") || message.includes("You cannot mute a guild member with a higher guild rank!") || message.includes("You cannot kick this player!") || message.includes("You can only promote up to your own rank!") || message.includes("You cannot mute yourself from the guild!") || message.includes("is the guild master so can't be demoted!") || message.includes("is the guild master so can't be promoted anymore!")) && !message.includes(":")
  }

  isIncorrectUsage(message) {
    return message.includes('Invalid usage!') && !message.includes(':')
  }

  isOnlineInvite(message) {
    return message.includes('You invited') && message.includes('to your guild. They have 5 minutes to accept.') && !message.includes(':')
  }

  isOfflineInvite(message) {
    return message.includes('You sent an offline invite to') && message.includes('They will have 5 minutes to accept once they come online!') && !message.includes(':')
  }

  isFailedInvite(message) {
    return (message.includes('is already in another guild!') || message.includes('You cannot invite this player to your guild!') || (message.includes("You've already invited") && message.includes("to your guild! Wait for them to accept!")) || message.includes('is already in your guild!')) && !message.includes(':')
  }

  isUserMuteMessage(message) {
    return message.includes('has muted') && message.includes('for') && !message.includes(':')
  }

  isUserUnmuteMessage(message) {
    return message.includes('has unmuted') && !message.includes(':')
  }

  isGuildMuteMessage(message) {
    return message.includes('has muted the guild chat for') && !message.includes(':')
  }

  isGuildUnmuteMessage(message) {
    return message.includes('has unmuted the guild chat!') && !message.includes(':')
  }

  isSetrankFail(message) {
    return message.includes("I couldn't find a rank by the name of ") && !message.includes(':')
  }

  isAlreadyMuted(message) {
    return message.includes('This player is already muted!') && !message.includes(':')
  }

  isNotInGuild(message) {
    return message.includes(' is not in your guild!') && !message.includes(':')
  }

  isLowestRank(message) {
    return message.includes("is already the lowest rank you've created!") && !message.includes(':')
  }

  isAlreadyHasRank(message) {
    return message.includes('They already have that rank!') && !message.includes(':')
  }

  isTooFast(message) {
    return message.includes('You are sending commands too fast! Please slow down.') && !message.includes(':')
  }

  isPlayerNotFound(message) {
    return message.startsWith(`Can't find a player by the name of`)
  }
}

module.exports = StateHandler
