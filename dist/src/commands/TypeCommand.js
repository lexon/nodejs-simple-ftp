"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class TypeCommand extends Command_1.default {
    replyCommand() {
        const type = this.getType();
        return `200 Type set to ${type}.`;
    }
    getType() {
        return this.args[0];
    }
}
exports.default = TypeCommand;
//# sourceMappingURL=TypeCommand.js.map