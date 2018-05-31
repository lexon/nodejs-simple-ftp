import * as net from 'net'
import * as stream from 'stream'
import FTPConnection from './FTPConnection'

import Logger from './Logger'
const log = new Logger("FTPDataConnection")




import * as fs from 'fs'

export default class FTPDataConnection {
  private socket
  private dataQueue: Array<String | stream.Readable>
  private socketReady: boolean

  constructor(private ftpConnection: FTPConnection, private clientIp: string, private clientPort: number) {
    this.socket = new net.Socket()
    this.dataQueue = []

    this.socket.on('ready', this.onSocketReady.bind(this))
    this.socket.on('connect', this.onSocketConnect.bind(this))
    this.socket.on('close', this.onSocketClose.bind(this))
    this.socket.on('error', this.onSocketError.bind(this))
    this.socket.on('end', this.onSocketEnd.bind(this));
    this.socket.on('data', this.onSocketData.bind(this));
  }

  private onSocketReady() {
    log.info(`FTPConnection -- onSocketReady`);

    this.socketReady = true
    this.processDataQueue()
  }

  private onSocketConnect() {
    log.info(`onSocketConnect`);
  }

  private onSocketClose() {
    log.info(`onSocketClose`);
  }

  private onSocketError(err) {
    this.socketReady = false
    log.info(`onSocketError ${err}`);
  }

  private onSocketEnd() {
    this.socketReady = false
    log.info(`onSocketEnd`);
  }

  private onSocketData(data) {
    log.info(`onSocketData ${data}`);
  }


  private processDataQueue(): void {
    if (this.dataQueue && this.dataQueue.length > 0) {
      this.dataQueue.forEach(data => {
        this.writeData(data)
      })
    }

    // reset
    this.dataQueue = [];
  }

  public connect() {
    this.socket.connect(this.clientPort, this.clientIp)
  }

  public end() {
    this.socket.end()
  }

  /**
   * Write a simple string or a stream data to the socket.
   */
  public writeData(data: String | stream.Readable) {
    if (!this.socketReady) {
      log.debug(`socket NOT READY, writing to queue: ${data}`)
      this.dataQueue.push(data)
    } else {
      log.debug(`writing to socket ${data}`)

      if (data instanceof String) {
        this.writeString(data)
      } else if (data instanceof stream.Readable) {
        this.writeBinaryData(data)
      } else {
        throw new Error(`Unsupported data type '${typeof data}'.`)
      }
    }
  }

  private writeBinaryData(stream: stream.Readable): void {
    stream.on('data', (chunk: Buffer) => {
      log.debug(`steaming data, buffer size: ${chunk.length}`)
      this.socket.write(chunk)
    })

    stream.on('end', () => {
      this.onTransferComplete()
    })
  }

  private writeString(message: String) {
    this.socket.write(message.toString(), 'UTF8', () => {
      log.debug("DATA WRITTEN")
    })

    this.onTransferComplete()
  }

  private onTransferComplete(): void {
    if (this.dataQueue.length <= 1) {
      this.ftpConnection.transferComplete();
      this.end();
    }
  }

}
