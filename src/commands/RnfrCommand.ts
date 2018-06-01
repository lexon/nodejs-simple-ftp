import Command from './Command'

import Logger from '../Logger'
const log = new Logger("RnfrCommand")

export default class RnfrCommand extends Command {

  public beforeReply() {
    // make sure there is no old propery
    delete this.ftpConnection.session.filepathToRename
    log.info(`Last filepathToRename: ${this.ftpConnection.session.filepathToRename}`)

    const filepath = this.ftpConnection.fileSystem.getFilepath(this.firstArg)
    log.info(`Current filepathToRename: ${filepath}`)

    const fileExists = this.ftpConnection.fileSystem.exists(filepath)
    log.info(`File exists: ${fileExists}`)

    if (fileExists) {
      this.ftpConnection.session.filepathToRename = filepath
    }
  }

  public replyCommand(): string {
    let reply = `550 RNFR command failed.`

    log.info(`File exists: ${this.ftpConnection.session.filepathToRename}`)
    if (this.ftpConnection.session.filepathToRename) {
      reply = `350 RNFR command successful.`
    }

    return reply
  }

}
