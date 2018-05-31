"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class OptsCommand extends Command_1.default {
    replyCommand() {
        const optionKey = this.getOptionKey();
        const optionValue = this.getOptionValue();
        return `502 Unknown command '${optionKey}'`;
    }
    getOptionKey() {
        return this.args[0];
    }
    getOptionValue() {
        return this.args[1];
    }
}
exports.default = OptsCommand;
//# sourceMappingURL=OptsCommand.js.map