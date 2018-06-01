import * as winston from 'winston'

const _logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  _logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default class Logger {
  private moduleName: string

  constructor(module: string) {
    this.moduleName = module
  }

  private composeMessage(message: string): string {
    return `${this.moduleName} -- ${message}`
  }

  public info(message, misc?: any) {
    _logger.log('info', this.composeMessage(message), misc)
  }

  public debug(message: string, misc?: any) {
    _logger.log('debug', this.composeMessage(message), misc)
  }

  public error(message: string, misc?: any) {
    _logger.log('error', this.composeMessage(message), misc)
  }
}
