'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(command, args, ftpConnection) {
        this.command = command;
        this.args = args;
        this.ftpConnection = ftpConnection;
    }
    process() {
    }
    beforeCommandSend() { }
    afterCommandSend() { }
    replyCommand() {
        throw new Error("No reply command specified. Did you forget to override in subclass?");
    }
}
exports.default = Command;
//# sourceMappingURL=Command.js.map