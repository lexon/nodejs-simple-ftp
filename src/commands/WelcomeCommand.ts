import Command from './Command'

export default class WelcomeCommand extends Command {
  public replyCommand(): string {
    return `220 ${"SERVER NAME"} server ready.`
  }
}
