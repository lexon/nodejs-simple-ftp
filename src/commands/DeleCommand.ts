import Command from './Command'

import Logger from '../Logger'
const log = new Logger("DeleCommand")

export default class DeleCommand extends Command {
  protected reply: string


  public beforeReply() {
    const filepath = this.ftpConnection.fileSystem.getFilepath(this.firstArg)
    log.info(`file path to delete: ${filepath}`)

    const fileExists = this.ftpConnection.fileSystem.exists(filepath)
    log.info(`file path to delete exists: ${fileExists}`)

    if (!fileExists) {
      this.reply = `550 ${this.firstArg} no such file or directory.`
      return
    }

    const fileAccess = this.ftpConnection.fileSystem.hasWriteAccess(filepath)
    log.info(`write access to file path: ${fileAccess}`)
    if (!fileAccess) {
      this.reply = `550 ${this.firstArg} permission denied.`
      return
    }

    log.info(`deleting ${filepath}.`)
    if (this.deleteFile(filepath)) {
      this.reply = `250 DELE command successful.`
    } else {
      this.reply = `550 DELE command unsuccessful.`
    }
  }

  protected deleteFile(filepath: string): boolean {
    return this.ftpConnection.fileSystem.unlink(filepath)
  }

  public replyCommand(): string {
    return this.reply
  }

}
