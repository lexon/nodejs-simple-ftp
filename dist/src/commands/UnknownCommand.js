"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class UnknownCommand extends Command_1.default {
    replyCommand() {
        return `500 '${this.command}' command not understood`;
    }
}
exports.default = UnknownCommand;
//# sourceMappingURL=UnknownCommand.js.map