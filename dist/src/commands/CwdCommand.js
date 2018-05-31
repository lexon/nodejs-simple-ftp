"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class CwdCommand extends Command_1.default {
    process() {
    }
    replyCommand() {
        let reply = `550 CWD failed.`;
        console.log("cwd args", this.args);
        let directory = this.generatePathFromArguments(this.args);
        if (this.ftpConnection.fileSystem.changeCurrentDirectory(directory)) {
            reply = `250 "${this.ftpConnection.fileSystem.getCurrentVisibleDirectory()}" CWD command successful.`;
        }
        return reply;
    }
    generatePathFromArguments(args) {
        let path = "";
        for (let i = 0; i < args.length; i++) {
            path += args[i] + " ";
        }
        path = path.substring(0, path.length - 1);
        return path;
    }
}
exports.default = CwdCommand;
//# sourceMappingURL=CwdCommand.js.map