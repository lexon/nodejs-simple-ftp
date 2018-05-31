import Command from './Command'

import Logger from '../Logger'
const log = new Logger("RetrCommand")

export default class RetrCommand extends Command {

  private stream

  public afterCommandSend() {
    // if a stream was created, start streaming data after informing the client
    if (this.stream) {
      this.ftpConnection.writeBinaryData(this.stream)
    }
  }

  public replyCommand(): string {
    const filename = this.getFilename()
    const filepath = this.getFilepath(filename)
    const fs = this.ftpConnection.fileSystem

    // default fail command
    let reply = `550 ${filename}: No such file or directory.`

    log.debug(`requested file: ${filename}`)
    log.debug(`full path to file: ${filepath}`)

    // first check if file (still) exists
    if (fs.exists(filepath)) {
      // exists but is a directory
      if (fs.isDirectory(filepath)) {
        reply = `550 ${filename}: Not a plain file.`
      } else {
        // file exists => create stream and inform client
        this.stream = this.ftpConnection.fileSystem.createReadStream(filepath)
        reply = `150 Opening BINARY mode data connection for '${filename}'.`
      }
    }

    return reply
  }

  getFilepath(filename: string): string {
    // this.ftpConnection.fileSystem.loadFile()
    const filepath = `${this.ftpConnection.getCurrentDirectory()}/${filename}`

    return filepath
  }

  /**
   * Read the file name sent by the client, it could have whitespaces.
   */
  getFilename(): string {
    // since it could have whitespaces, take all of the args
    return this.args.join(" ")
  }
}
