import Command from './Command'

import Logger from '../Logger'
const log = new Logger("MkdCommand")

export default class MkdCommand extends Command {
  private reply: string


  public beforeReply() {
    const filepath = this.ftpConnection.fileSystem.getFilepath(this.firstArg)
    log.info(`file path to create: ${filepath}`)

    const fileExists = this.ftpConnection.fileSystem.exists(filepath)
    log.info(`file path exists: ${fileExists}`)

    if (fileExists) {
      this.reply = `550 ${this.firstArg} directory already exists.`
      return
    }

    // check if we have write access to the current folder
    const hasWriteAccess = this.ftpConnection.fileSystem.hasWriteAccess(this.ftpConnection.fileSystem.currentDirectory)
    if (!hasWriteAccess) {
      this.reply = `553 ${this.firstArg}: Permission denied.`
      return
    }

    log.info(`creating directory ${filepath}.`)
    const mkdirSuccess = this.ftpConnection.fileSystem.mkdir(filepath)
    log.info(`mkdir succesful: ${mkdirSuccess}`)

    if (mkdirSuccess) {
      this.reply = `250 MKD command successful.`
    } else {
      this.reply = `553 ${this.firstArg}: error creating folder.`
    }

  }

  public replyCommand(): string {
    return this.reply
  }

}
