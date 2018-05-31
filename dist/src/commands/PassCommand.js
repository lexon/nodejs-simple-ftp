"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class PassCommand extends Command_1.default {
    beforeCommandSend() {
        this.ftpConnection.currentPassword = this.getPassword();
    }
    replyCommand() {
        return `230 User ${this.ftpConnection.currentUsername} logged in.`;
    }
    getPassword() {
        return this.args[0];
    }
}
exports.default = PassCommand;
//# sourceMappingURL=PassCommand.js.map