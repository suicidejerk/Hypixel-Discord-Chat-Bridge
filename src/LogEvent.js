const chalk = require('chalk')

class LogEvent {
    misc(message) {
        return console.log(chalk.black.bgWhite(`[${this.getDate()}] Miscellaneous  >`) + ' ' + chalk.white(message))
    }
    party(message) {
        return console.log(chalk.white.bgBlue(`[${this.getDate()}] Party System   >`) + ' ' + chalk.blue(message))
    }
    discord(message) {
        return console.log(chalk.white.bgGreen(`[${this.getDate()}] Minecraft Chat >`) + ' ' + chalk.green(message))
    }
    minecraft(message) {
        return console.log(chalk.white.bgMagenta(`[${this.getDate()}] Discord Chat   >`) + ' ' + chalk.magenta(message))
    }
    error() {
        return console.log(chalk.white.bgRed(`[${this.getDate()}] Error          >`) + ' ' + chalk.red(message))
    }

    getDate() {
        return new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    }
}

module.exports = LogEvent