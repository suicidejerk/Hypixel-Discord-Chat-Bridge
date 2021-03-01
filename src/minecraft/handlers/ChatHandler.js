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

      setInterval(async () => {  // Refresh it every 15 minutes
        this.guildMembers = await this.getGuildMembers(CONFIG.minecraft.fragRuns);
      }, 900000)
    }

    this.bot.on('message', (...args) => this.onMessage(...args))
  }

  onMessage(event) {
    const message = event.toString().trim()

    if (this.isLobbyJoinMessage(message)) {
      this.logEvent.misc('Sending Minecraft client to limbo')

      return this.bot.chat('§')
    }

    if (this.isPartyInviteMessage(message)) {
      this.inviter = message.split(" ")[1]
      if (this.inviter === "has") this.inviter = message.split(" ")[0].replace("-----------------------------\n", "") // Nons

      if (CONFIG.minecraft.fragRuns !== "none") {
        if ((CONFIG.minecraft.fragRun !== "everyone" && this.guildMembers && !this.guildMembers.has(this.inviter))) {
          setTimeout(() => {
            this.logEvent.party("Won't accept party invite from: " + this.inviter + ", since they aren't in " + CONFIG.minecraft.fragRuns)
            let sorryMsg = "Sorry, this bot is set to only accept party invites from guild members, sucks to suck! Join " + CONFIG.minecraft.fragRuns + "!"

            sorryMsg = this.addCharToString(sorryMsg, "⭍", 15);
            this.bot.chat("/msg " + this.inviter + " " + sorryMsg)
          }, 100)
        } else {
          this.logEvent.party("Accepting party invite from: " + this.inviter)

          setTimeout(() => {
            this.bot.chat("/p join " + this.inviter)
          }, 100)
        }
      } else {
        setTimeout(() => {
          this.logEvent.party("Won't accept party invite from: " + this.inviter + ", since frag runs are turned off")
          let sorryMsg = "Sorry, frag runs are turned off at the moment."

          sorryMsg = this.addCharToString(sorryMsg, "⭍", 15);
          this.bot.chat("/msg " + this.inviter + " " + sorryMsg)
        }, 100)
      }
      return
    }

    if (this.inviter) {
      if (this.isMessageYouJoinedParty(message)) {
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

        let sorryMsg = "Sorry, I'm already in a party with " + this.partyLeader ? this.partyLeader : "someone" + ", try in a bit! uwu"

        sorryMsg = this.addCharToString(sorryMsg, "⭍", 15);
        this.bot.chat("/msg " + pastInviter + " " + sorryMsg)
        setTimeout((pastInviter) => {
          if (this.inviter === pastInviter || this.partyLeader == 0) this.bot.chat("/p leave") // In case it gets stuck
        }, 5000)
      }
    }

    if (!this.isGuildMessage(message)) {
      return
    }

    let parts = message.split(':')
    let group = parts.shift().trim()
    let hasRank = group.endsWith(']')

    let userParts = group.split(' ')
    let username = userParts[userParts.length - (hasRank ? 2 : 1)]

    if (this.isMessageFromBot(username)) {
      return
    }

    const playerMessage = parts.join(':').trim()
    if (this.command.handle(username, playerMessage)) {
      return
    }

    this.minecraft.broadcastMessage({
      username: username,
      message: playerMessage,
    })
  }

  isMessageFromBot(username) {
    return this.bot.username === username
  }

  isLobbyJoinMessage(message) {
    return (message.endsWith(' the lobby!') || message.endsWith(' the lobby! <<<')) && message.includes('[MVP+')
  }

  isGuildMessage(message) {
    return message.startsWith('Guild >') && message.includes(':')
  }

  isPartyInviteMessage(message) {
    return message.endsWith(" here to join!\n-----------------------------") && !message.includes(':')
  }

  isMessageYouJoinedParty(message) {
    return message.endsWith(" party!") && !message.includes(':')
  }

  isMessageYoureInParty(message) {
    return message.endsWith(" to join another one.") && !message.includes(':')
  }

  addCharToString(string, chars, times) {
    for (let i = 0; i < times; i++) {
      let randomNumber = Math.floor(Math.random() * string.length + 1)
      let a = string.split("")

      a.splice(randomNumber, 0, chars)
      string = a.join("")
    }
    return string
  }

  async getGuildMembers(guildname) {
    this.logEvent.misc("Getting players from guild: " + guildname)

    const responseHypixel = await fetch("https://api.hypixel.net/guild?name=" + guildname + "&key=" + CONFIG.minecraft.hypixelToken)
    const dataHypixel = await responseHypixel.json()

    if (dataHypixel && dataHypixel.guild) {
      let members = new Map()

      await Promise.all(
        dataHypixel.guild.members.map(async (member) => {
          const response = await fetch("https://api.mojang.com/user/profiles/" + member.uuid + "/names")
          const data = await response.json()

          members.set(data.pop().name, member.uuid)
        })
      )

      this.logEvent.misc(members.size + " players from guild: " + guildname + " fetched!")
      return members
    } else {
      this.logEvent.error("Guild " + guildname + " not found or Hypixel API Token is invalid!")
    }
  }
}

module.exports = StateHandler
