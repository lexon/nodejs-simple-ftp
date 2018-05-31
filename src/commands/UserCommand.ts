import Command from './Command'

export default class UserCommand extends Command {

  public process(): void {
    this.ftpConnection.currentUsername = this.getUsername()
  }

  public replyCommand(): string {
    return `331 Password required for ${this.getUsername()}`
  }

  getUsername(): string {
    return this.args[0]
  }
}
