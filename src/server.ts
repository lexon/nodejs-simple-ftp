import * as net from 'net'
import FTPConnection from './FTPConnection'

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
      console.log('opened server on', this.server.address())
    })
  }

  private onNewConnection(socket) {
    console.log(`client connected!`, socket.address())
    // this.connectedClients++;

    let ftpConnection = new FTPConnection(socket, this.config.ftpBaseDir, false)
    ftpConnection.welcome()
  }

  private onError(err) {
    console.log(`onError ${err}`);
  }

  private onData(data) {
    console.log(`onData ${data}`);
  }

  private onClose(a) {
    console.log(a, 'disconnected from server')
  }
}
