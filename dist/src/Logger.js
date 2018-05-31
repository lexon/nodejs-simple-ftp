"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const _logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: []
});
if (process.env.NODE_ENV !== 'production') {
    _logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
class Logger {
    constructor(module) {
        this.moduleName = module;
    }
    composeMessage(message) {
        return `${this.moduleName} -- ${message}`;
    }
    info(message, misc) {
        _logger.log('info', this.composeMessage(message), misc);
    }
    debug(message, misc) {
        _logger.log('debug', this.composeMessage(message), misc);
    }
    error(message) {
        _logger.log('error', message);
    }
}
exports.default = Logger;
//# sourceMappingURL=Logger.js.map