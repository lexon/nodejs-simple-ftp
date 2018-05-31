"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class TransferCompleteCommand extends Command_1.default {
    replyCommand() {
        return `226 Transfer complete.`;
    }
}
exports.default = TransferCompleteCommand;
//# sourceMappingURL=TransferCompleteCommand.js.map