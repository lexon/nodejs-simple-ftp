"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class UnknownCommand extends Command_1.default {
    process() {
        this.ftpConnection.currentUsername = this.getUsername();
    }
    replyCommand() {
        return `500 '${this.command}' command not understood`;
    }
    getUsername() {
        return this.args[0];
    }
}
exports.default = UnknownCommand;
//# sourceMappingURL=UknownCommand.js.map