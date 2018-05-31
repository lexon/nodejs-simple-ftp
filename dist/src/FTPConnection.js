"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FTPDataConnection_1 = require("./FTPDataConnection");
const Filesystem_1 = require("./Filesystem");
const WelcomeCommand_1 = require("./commands/WelcomeCommand");
const TransferCompleteCommand_1 = require("./commands/TransferCompleteCommand");
const CommandMap_1 = require("./commands/CommandMap");
const Logger_1 = require("./Logger");
const log = new Logger_1.default("FTPConnection");
class FTPConnection {
    constructor(clientSocket, rootDirectory, sandboxRootDirectory) {
        this.clientSocket = clientSocket;
        this.rootDirectory = rootDirectory;
        this.sandboxRootDirectory = sandboxRootDirectory;
        this.init();
        this.fileSystem = new Filesystem_1.default(this.rootDirectory, this.rootDirectory, sandboxRootDirectory);
    }
    getCurrentVisibleDirectory() {
        return this.fileSystem.getCurrentVisibleDirectory();
    }
    getCurrentDirectory() {
        return this.fileSystem.currentDirectory;
    }
    init() {
        this.clientSocket.on('ready', this.onSocketReady);
        this.clientSocket.on('close', this.onSocketClose);
        this.clientSocket.on('error', this.onSocketError);
        this.clientSocket.on('end', this.onSocketEnd);
        this.clientSocket.on('data', this.onSocketData.bind(this));
    }
    welcome() {
        const welcome = new WelcomeCommand_1.default(null, null, this);
        this.proccessCommand(welcome);
    }
    transferComplete() {
        const complete = new TransferCompleteCommand_1.default(null, null, this);
        this.proccessCommand(complete);
    }
    onSocketReady() {
        log.info(`onSocketReady`);
    }
    onSocketClose() {
        log.info(`onSocketClose`);
    }
    onSocketError(err) {
        log.info(`onSocketError ${err}`);
    }
    onSocketEnd() {
        log.info(`onSocketEnd`);
    }
    onSocketData(data) {
        let message = data.toString();
        log.info(`to server: ${message.slice(0, -2)}`);
        const command = CommandMap_1.default.parse(message, this);
        this.proccessCommand(command);
    }
    proccessCommand(command) {
        command.process();
        const message = command.replyCommand();
        log.info(`to client: ${message}\r\n`);
        command.beforeCommandSend();
        this.writeString(message);
        command.afterCommandSend();
    }
    writeString(message) {
        this.clientSocket.write(`${message}\r\n`);
    }
    writeDataString(message) {
        this.dataSocket.writeData(new String(`${message}\r\n`));
    }
    writeBinaryData(stream) {
        this.dataSocket.writeData(stream);
    }
    openDataSocket(clientIp, clientPort) {
        if (this.dataSocket) {
            this.dataSocket.end();
            this.dataSocket = null;
        }
        this.dataSocket = new FTPDataConnection_1.default(this, clientIp, clientPort);
        this.dataSocket.connect();
    }
}
exports.default = FTPConnection;
//# sourceMappingURL=FTPConnection.js.map