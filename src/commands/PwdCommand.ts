import Command from './Command'

export default class PwdCommand extends Command {

  public replyCommand(): string {
    return `257 "${this.ftpConnection.fileSystem.getCurrentVisibleDirectory()}" is the current directory.`
  }
}
