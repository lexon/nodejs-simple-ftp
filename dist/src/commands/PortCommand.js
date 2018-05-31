"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class PortCommand extends Command_1.default {
    afterCommandSend() {
        this.ftpConnection.openDataSocket(this.clientIp, this.clientPort);
    }
    replyCommand() {
        return `200 PORT command successful.`;
    }
    get clientIp() {
        const portArgs = this.args[0].split(",");
        const clientIp = `${portArgs[0]}.${portArgs[1]}.${portArgs[2]}.${portArgs[3]}`;
        return clientIp;
    }
    get clientPort() {
        const portArgs = this.args[0].split(",").splice(-2);
        const clientPort = (parseInt(portArgs[0]) << 8) + parseInt(portArgs[1], 10);
        return clientPort;
    }
}
exports.default = PortCommand;
//# sourceMappingURL=PortCommand.js.map