import Command from './Command'

export default class TypeCommand extends Command {

  public replyCommand(): string {
    const type = this.getType()

    return `200 Type set to ${type}.`
  }

  getType(): string {
    return this.args[0]
  }
}
