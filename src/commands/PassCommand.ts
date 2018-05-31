import Command from './Command'

export default class PassCommand extends Command {

  public beforeCommandSend(): void {
    // TODO: refactor to user object
    this.ftpConnection.currentPassword = this.getPassword()
  }

  public replyCommand(): string {

    // TODO: add user permision check e.g. this.ftpConnection.userCredentialsValid
    return `230 User ${this.ftpConnection.currentUsername} logged in.`
  }

  getPassword(): string {
    return this.args[0]
  }
}
