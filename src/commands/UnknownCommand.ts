import Command from './Command'

export default class UnknownCommand extends Command {
  public replyCommand(): string {
    return `500 '${this.command}' command not understood`
  }
}
