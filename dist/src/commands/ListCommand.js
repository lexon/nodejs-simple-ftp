"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
class ListCommand extends Command_1.default {
    afterCommandSend() {
        const directory = this.getDirectory();
        const list = this.ftpConnection.fileSystem.getList(directory);
        this.ftpConnection.writeDataString(list);
    }
    replyCommand() {
        return `150 Opening ASCII mode data connection for '/bin/ls'.`;
    }
    getDirectory() {
        let directory = this.args[0];
        if (!directory || directory.length < 0) {
            directory = this.ftpConnection.getCurrentDirectory();
        }
        else {
        }
        console.log(directory);
        return directory;
    }
}
exports.default = ListCommand;
//# sourceMappingURL=ListCommand.js.map