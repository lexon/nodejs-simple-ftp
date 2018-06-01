import Command from './Command'

export default class TransferCompleteCommand extends Command {

  public replyCommand(): string {
    return `226 Transfer complete.`
  }

}
