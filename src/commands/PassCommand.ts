import Command from './Command'

export default class PassCommand extends Command {

  public beforeReply(): void {
    // TODO: refactor to user object
    this.ftpConnection.session.password = this.getPassword()
  }

  public replyCommand(): string {

    // TODO: add user permision check e.g. this.ftpConnection.userCredentialsValid
    return `230 User ${this.ftpConnection.session.username} logged in.`
  }

  getPassword(): string {
    return this.args[0]
  }
}
