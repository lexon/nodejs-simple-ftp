"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
const client = net.createConnection({ port: 1337 }, () => {
    console.log('connected to server!');
    client.write('client: hello server!\r\n');
});
client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
client.on('end', (a) => {
    console.log(a, 'disconnected from server');
});
//# sourceMappingURL=client.js.map