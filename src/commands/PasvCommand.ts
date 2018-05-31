import Command from './Command'

export default class PasvCommand extends Command {

  // public afterCommandSend(): void {
  //   this.ftpConnection.openDataSocket(this.clientIp, this.clientPort)
  // }
  //
  // public replyCommand(): string {
  //   return `200 PORT command successful.`
  // }
  //
  // get clientIp(): string {
  //   const portArgs = this.args[0].split(",");
  //   const clientIp = `${portArgs[0]}.${portArgs[1]}.${portArgs[2]}.${portArgs[3]}`;
  //
  //   return clientIp
  // }
  //
  // get clientPort(): number {
  //   const portArgs = this.args[0].split(",").splice(-2);
  //   const clientPort: number = (parseInt(portArgs[0]) << 8) + parseInt(portArgs[1], 10);
  //
  //   return clientPort
  // }

}
