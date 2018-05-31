"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
const FTPConnection_1 = require("./FTPConnection");
class ServerConfig {
    constructor(ip, port, ftpBaseDir) {
        this.ip = ip;
        this.port = port;
        this.ftpBaseDir = ftpBaseDir;
    }
}
exports.ServerConfig = ServerConfig;
var transferModes;
(function (transferModes) {
    transferModes[transferModes["pasvftp"] = 0] = "pasvftp";
    transferModes["epsvftp"] = "epsvftp";
    transferModes["portftp"] = "portftp";
    transferModes["lprtftp"] = "lprtftp";
    transferModes["eprtftp"] = "eprtftp";
})(transferModes || (transferModes = {}));
class Server {
    constructor(config) {
        this.config = config;
        this.connectedClients = 0;
        this.initServer();
    }
    initServer() {
        this.server = net.createServer();
        this.server.on('connection', this.onNewConnection.bind(this));
        this.server.on('error', this.onError);
        this.server.on('close', this.onClose);
    }
    start() {
        this.server.listen({
            port: this.config.port,
            host: this.config.ip
        }, () => {
            console.log('opened server on', this.server.address());
        });
    }
    onNewConnection(socket) {
        console.log(`client connected!`, socket.address());
        let ftpConnection = new FTPConnection_1.default(socket, this.config.ftpBaseDir, false);
        ftpConnection.welcome();
    }
    onError(err) {
        console.log(`onError ${err}`);
    }
    onData(data) {
        console.log(`onData ${data}`);
    }
    onClose(a) {
        console.log(a, 'disconnected from server');
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map