import Command from './Command'

export default class ListCommand extends Command {

  public afterCommandSend() {
    const directory = this.getDirectory()
    const list: string = this.ftpConnection.fileSystem.getList(directory)

    this.ftpConnection.writeDataString(list)

  }
  public replyCommand(): string {
    return `150 Opening ASCII mode data connection for '/bin/ls'.`
  }

  getDirectory(): string {
    let directory = this.args[0]
    if (!directory || directory.length < 0) {
      directory = this.ftpConnection.getCurrentDirectory();
    } else {
      // directory = me.getDirectory();
    }

    console.log(directory)


    return directory
  }
}
