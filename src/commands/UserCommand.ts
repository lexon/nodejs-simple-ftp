import Command from './Command'

export default class UserCommand extends Command {

  public beforeReply(): void {
    this.ftpConnection.session.username = this.firstArg
  }

  public replyCommand(): string {
    return `331 Password required for ${this.firstArg}`
  }

}
