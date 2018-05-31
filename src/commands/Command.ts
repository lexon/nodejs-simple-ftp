'use strict'

import FTPConnection from '../FTPConnection'

export default class Command {
  constructor(public command: string, protected args: Array<string>, protected ftpConnection: FTPConnection) { }

  public process(): void {
    // noOp
  }

  public beforeCommandSend(): void { }
  public afterCommandSend(): void { }

  public replyCommand(): string {
    throw new Error("No reply command specified. Did you forget to override in subclass?")
  }

}
