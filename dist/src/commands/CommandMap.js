"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnknownCommand_1 = require("./UnknownCommand");
const UserCommand_1 = require("./UserCommand");
const PassCommand_1 = require("./PassCommand");
const PwdCommand_1 = require("./PwdCommand");
const CwdCommand_1 = require("./CwdCommand");
const TypeCommand_1 = require("./TypeCommand");
const PortCommand_1 = require("./PortCommand");
const ListCommand_1 = require("./ListCommand");
const RetrCommand_1 = require("./RetrCommand");
const OptsCommand_1 = require("./OptsCommand");
const QuitCommand_1 = require("./QuitCommand");
exports.default = {
    parse(message, ftpConnection) {
        message = message.substring(0, message.length - 2);
        const messageParts = message.split(" ");
        const cmd = messageParts[0].toLowerCase();
        let clazz = CommandMap[cmd];
        if (!clazz) {
            clazz = UnknownCommand_1.default;
        }
        const args = messageParts.splice(1, messageParts.length - 1);
        const retVal = new clazz(cmd, args, ftpConnection);
        return retVal;
    }
};
const CommandMap = {
    user: UserCommand_1.default,
    pass: PassCommand_1.default,
    pwd: PwdCommand_1.default,
    cwd: CwdCommand_1.default,
    type: TypeCommand_1.default,
    opts: OptsCommand_1.default,
    port: PortCommand_1.default,
    list: ListCommand_1.default,
    retr: RetrCommand_1.default,
    quit: QuitCommand_1.default
};
//# sourceMappingURL=CommandMap.js.map