import FTPDataConnection from './FTPDataConnection'
import Filesystem from './Filesystem'
import Command from './commands/Command'
import WelcomeCommand from './commands/WelcomeCommand'
import TransferCompleteCommand from './commands/TransferCompleteCommand'

import CommandMap from './commands/CommandMap'
import * as stream from 'stream'

import Logger from './Logger'
const log = new Logger("FTPConnection")

export default class FTPConnection {
  // private serverSocket
  // private clientSocket

  /**
   * The current username provided during login step
   */
  public currentUsername
  public currentPassword

  // private rootDirectory
  public getCurrentVisibleDirectory() {
    return this.fileSystem.getCurrentVisibleDirectory()
  }

  public getCurrentDirectory() {
    return this.fileSystem.currentDirectory
  }

  // private sandboxRootDirectory

  private transferMode
  public dataSocket: FTPDataConnection
  public fileSystem: Filesystem


  constructor(public clientSocket, private rootDirectory: string, private sandboxRootDirectory: boolean) {
    this.init()
    this.fileSystem = new Filesystem(this.rootDirectory, this.rootDirectory, sandboxRootDirectory)
  }

  private init(): void {
    this.clientSocket.on('ready', this.onSocketReady)
    this.clientSocket.on('close', this.onSocketClose)
    this.clientSocket.on('error', this.onSocketError)
    this.clientSocket.on('end', this.onSocketEnd);
    this.clientSocket.on('data', this.onSocketData.bind(this));
  }

  public welcome(): void {
    // welcome the client
    const welcome = new WelcomeCommand(null, null, this)
    this.proccessCommand(welcome)
  }

  public transferComplete() {
    const complete = new TransferCompleteCommand(null, null, this)
    this.proccessCommand(complete)
  }

  private onSocketReady() {
    log.info(`onSocketReady`);
  }

  private onSocketClose() {
    log.info(`onSocketClose`);
  }

  private onSocketError(err) {
    log.info(`onSocketError ${err}`);
  }
  private onSocketEnd() {
    log.info(`onSocketEnd`);
  }
  private onSocketData(data) {
    // TODO: check if data is really string/buffer
    let message = data.toString()
    log.info(`to server: ${message.slice(0, -2)}`)

    // get the specific command
    const command: Command = CommandMap.parse(message, this)
    this.proccessCommand(command);
  }

  private proccessCommand(command: Command) {
    command.process()

    // send the reply to the client
    const message = command.replyCommand()
    log.info(`to client: ${message}\r\n`)

    command.beforeCommandSend()
    this.writeString(message)
    command.afterCommandSend()
  }

  private writeString(message: string) {
    this.clientSocket.write(`${message}\r\n`)
  }

  public writeDataString(message: string) {
    this.dataSocket.writeData(new String(`${message}\r\n`))
  }

  public writeBinaryData(stream: stream.Readable): void {
    this.dataSocket.writeData(stream)
  }

  public openDataSocket(clientIp: string, clientPort: number) {

    // check for any still open connections and close them
    if (this.dataSocket) {
      this.dataSocket.end()
      this.dataSocket = null;
    }

    this.dataSocket = new FTPDataConnection(this, clientIp, clientPort) //net.createConnection(clientPort, clientIp)
    this.dataSocket.connect()
  }

}
