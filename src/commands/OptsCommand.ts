import Command from './Command'

export default class OptsCommand extends Command {

  public replyCommand(): string {

    const optionKey = this.getOptionKey()
    const optionValue = this.getOptionValue()

    return `502 Unknown command '${optionKey}'`
  }

  private getOptionKey(): string {
    return this.args[0]
  }

  private getOptionValue(): string {
    return this.args[1]
  }
}
