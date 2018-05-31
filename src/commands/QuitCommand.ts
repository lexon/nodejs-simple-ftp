import Command from './Command'

export default class QuitCommand extends Command {

  public replyCommand(): string {
    return `221 Thank you for using the FTP service.`
    // me.writeString("221- Data traffic for this session was 0 bytes in 0 files")
  }

  public afterCommandSend(): void {
    this.ftpConnection.clientSocket.end()
  }
}
