"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./src/server");
const config = new server_1.ServerConfig('127.0.0.1', 1337, '/Users/alex/tmp/fttp');
let ftp = new server_1.Server(config);
ftp.start();
//# sourceMappingURL=index.js.map