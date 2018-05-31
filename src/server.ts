import * as net from 'net'
import FTPConnection from './FTPConnection'

import Logger from './Logger'
const log = new Logger("Server")

export class ServerConfig {

  constructor(public ip: string, public port: number, public ftpBaseDir: string) { }

}


enum transferModes {
  pasvftp = 0,
  epsvftp = "epsvftp",
  portftp = "portftp",
  lprtftp = "lprtftp",
  eprtftp = "eprtftp"
}


export class Server {
  private server
  private connectedClients: number

  constructor(private config: ServerConfig) {
    this.connectedClients = 0
    this.initServer()
  }

  private initServer() {
    this.server = net.createServer();

    this.server.on('connection', this.onNewConnection.bind(this))
    this.server.on('error', this.onError)
    this.server.on('close', this.onClose)
  }

  public start() {
    this.server.listen({
      port: this.config.port,
      host: this.config.ip
    }, () => {
      log.info(`FTP Server started on`, this.server.address())
    })
  }

  private onNewConnection(socket) {
    log.info(`client connected from ${socket.remoteAddress}:${socket.remotePort}`)
    this.connectedClients++;

    this.reportCurrentStats()

    const ftpConnection = new FTPConnection(socket, this.config.ftpBaseDir, false)
    ftpConnection.welcome()
  }

  private onError(err) {
    log.error(`onError ${err}`);
  }

  private onClose(a) {
    log.info(a, 'clent disconnected from server.')
    this.connectedClients--;

    this.reportCurrentStats()
  }


  private reportCurrentStats(): void {
    log.info(`currently active clients: ${this.connectedClients}`)
  }
}
