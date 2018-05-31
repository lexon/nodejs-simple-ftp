"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class UserCommand extends Command_1.default {
    process() {
        this.ftpConnection.currentUsername = this.getUsername();
    }
    replyCommand() {
        return `331 Password required for ${this.getUsername()}`;
    }
    getUsername() {
        return this.args[0];
    }
}
exports.default = UserCommand;
//# sourceMappingURL=UserCommand.js.map