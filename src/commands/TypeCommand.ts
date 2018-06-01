import Command from './Command'

export default class TypeCommand extends Command {

  public replyCommand(): string {
    return `200 Type set to ${this.firstArg}.`
  }

}
