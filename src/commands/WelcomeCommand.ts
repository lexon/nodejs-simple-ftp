import Command from './Command'

export default class WelcomeCommand extends Command {

  public replyCommand(): string {
    return `220 ${"Lexx-FTP"} server ready.`
  }

}
