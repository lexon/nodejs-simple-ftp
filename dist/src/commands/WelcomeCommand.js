"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class WelcomeCommand extends Command_1.default {
    replyCommand() {
        return `220 ${"SERVER NAME"} server ready.`;
    }
}
exports.default = WelcomeCommand;
//# sourceMappingURL=WelcomeCommand.js.map