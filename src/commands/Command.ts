'use strict'

import FTPConnection from '../FTPConnection'

export default class Command {
  constructor(public command: string, protected args: Array<string>, protected ftpConnection: FTPConnection) { }

  /**
   * Do any preparations here.
   */
  public beforeReply(): void {
    // noOp
  }

  /**
   * Do any cleanup here.
   */
  public afterReply(): void {
    // noOp
  }

  /**
   * The reply command to send to the client.
   */
  public replyCommand(): string {
    throw new Error("No reply command specified. Did you forget to override in subclass?")
  }

  protected get firstArg(): string {
    return this.args[0]
  }

}
