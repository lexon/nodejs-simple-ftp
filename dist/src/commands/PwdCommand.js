"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class PwdCommand extends Command_1.default {
    replyCommand() {
        return `257 "${this.ftpConnection.fileSystem.getCurrentVisibleDirectory()}" is the current directory.`;
    }
}
exports.default = PwdCommand;
//# sourceMappingURL=PwdCommand.js.map