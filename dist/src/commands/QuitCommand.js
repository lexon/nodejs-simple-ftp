"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class QuitCommand extends Command_1.default {
    replyCommand() {
        return `221 Thank you for using the FTP service.`;
    }
    afterCommandSend() {
        this.ftpConnection.clientSocket.end();
    }
}
exports.default = QuitCommand;
//# sourceMappingURL=QuitCommand.js.map