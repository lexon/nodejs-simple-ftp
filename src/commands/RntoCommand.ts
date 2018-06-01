import Command from './Command'

import Logger from '../Logger'
const log = new Logger("RntoCommand")

export default class RntoCommand extends Command {
  private renamedSuccessfully: boolean

  public beforeReply() {
    const filepath = this.ftpConnection.fileSystem.getFilepath(this.firstArg)
    log.info(`new file path: ${filepath}`)

    const fileExists = this.ftpConnection.fileSystem.exists(this.ftpConnection.session.filepathToRename)
    log.info(`Folder to rename still exists: ${fileExists}`)

    if (fileExists) {
      log.info(`Renaming ${this.ftpConnection.session.filepathToRename} to ${filepath}.`)

      this.ftpConnection.fileSystem.rename(this.ftpConnection.session.filepathToRename, filepath)
      this.renamedSuccessfully = true

      // cleanup
      delete this.ftpConnection.session.filepathToRename
    }

  }

  public replyCommand(): string {
    let reply = `550 RNTO command failed.`

    if (this.renamedSuccessfully) {
      reply = `250 RNTO command successful.`
    }

    return reply
  }

}
