"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Logger_1 = require("../Logger");
const log = new Logger_1.default("RetrCommand");
class RetrCommand extends Command_1.default {
    afterCommandSend() {
        if (this.stream) {
            this.ftpConnection.writeBinaryData(this.stream);
        }
    }
    replyCommand() {
        const filename = this.getFilename();
        const filepath = this.getFilepath(filename);
        const fs = this.ftpConnection.fileSystem;
        let reply = `550 ${filename}: No such file or directory.`;
        log.debug(`requested file: ${filename}`);
        log.debug(`full path to file: ${filepath}`);
        if (fs.exists(filepath)) {
            if (fs.isDirectory(filepath)) {
                reply = `550 ${filename}: Not a plain file.`;
            }
            else {
                this.stream = this.ftpConnection.fileSystem.createReadStream(filepath);
                reply = `150 Opening BINARY mode data connection for '${filename}'.`;
            }
        }
        return reply;
    }
    getFilepath(filename) {
        const filepath = `${this.ftpConnection.getCurrentDirectory()}/${filename}`;
        return filepath;
    }
    getFilename() {
        return this.args.join(" ");
    }
}
exports.default = RetrCommand;
//# sourceMappingURL=RetrCommand.js.map