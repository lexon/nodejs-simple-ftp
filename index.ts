import { Server, ServerConfig } from './src/server'

const config = new ServerConfig('127.0.0.1', 1337, '/Users/alex/tmp/fttp')
let ftp = new Server(config)
ftp.start()
