import * as net from 'net'

const client = net.createConnection({ port: 1337 }, () => {
  // 'connect' listener
  console.log('connected to server!');
  client.write('client: hello server!\r\n');
});


client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});


client.on('end', (a) => {
  console.log(a, 'disconnected from server');
})
