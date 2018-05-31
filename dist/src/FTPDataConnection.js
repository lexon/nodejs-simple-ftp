"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
const stream = require("stream");
const Logger_1 = require("./Logger");
const log = new Logger_1.default("FTPDataConnection");
class FTPDataConnection {
    constructor(ftpConnection, clientIp, clientPort) {
        this.ftpConnection = ftpConnection;
        this.clientIp = clientIp;
        this.clientPort = clientPort;
        this.socket = new net.Socket();
        this.dataQueue = [];
        this.socket.on('ready', this.onSocketReady.bind(this));
        this.socket.on('connect', this.onSocketConnect.bind(this));
        this.socket.on('close', this.onSocketClose.bind(this));
        this.socket.on('error', this.onSocketError.bind(this));
        this.socket.on('end', this.onSocketEnd.bind(this));
        this.socket.on('data', this.onSocketData.bind(this));
    }
    onSocketReady() {
        log.info(`FTPConnection -- onSocketReady`);
        this.socketReady = true;
        this.processDataQueue();
    }
    onSocketConnect() {
        log.info(`onSocketConnect`);
    }
    onSocketClose() {
        log.info(`onSocketClose`);
    }
    onSocketError(err) {
        this.socketReady = false;
        log.info(`onSocketError ${err}`);
    }
    onSocketEnd() {
        this.socketReady = false;
        log.info(`onSocketEnd`);
    }
    onSocketData(data) {
        log.info(`onSocketData ${data}`);
    }
    processDataQueue() {
        if (this.dataQueue && this.dataQueue.length > 0) {
            this.dataQueue.forEach(data => {
                this.writeData(data);
            });
        }
        this.dataQueue = [];
    }
    connect() {
        this.socket.connect(this.clientPort, this.clientIp);
    }
    end() {
        this.socket.end();
    }
    writeData(data) {
        if (!this.socketReady) {
            log.debug(`socket NOT READY, writing to queue: ${data}`);
            this.dataQueue.push(data);
        }
        else {
            log.debug(`writing to socket ${data}`);
            if (data instanceof String) {
                this.writeString(data);
            }
            else if (data instanceof stream.Readable) {
                this.writeBinaryData(data);
            }
            else {
                throw new Error(`Unsupported data type '${typeof data}'.`);
            }
        }
    }
    writeBinaryData(stream) {
        stream.on('data', (chunk) => {
            log.debug(`steaming data, buffer size: ${chunk.length}`);
            this.socket.write(chunk);
        });
        stream.on('end', () => {
            this.onTransferComplete();
        });
    }
    writeString(message) {
        this.socket.write(message.toString(), 'UTF8', () => {
            log.debug("DATA WRITTEN");
        });
        this.onTransferComplete();
    }
    onTransferComplete() {
        if (this.dataQueue.length <= 1) {
            this.ftpConnection.transferComplete();
            this.end();
        }
    }
}
exports.default = FTPDataConnection;
//# sourceMappingURL=FTPDataConnection.js.map