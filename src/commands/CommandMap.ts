import FTPConnection from '../FTPConnection'

import Command from './Command'
import UnknownCommand from './UnknownCommand'

/** Commmands **/
import UserCommand from './UserCommand'
import PassCommand from './PassCommand'
import PwdCommand from './PwdCommand'
import CwdCommand from './CwdCommand'
import TypeCommand from './TypeCommand'
import PortCommand from './PortCommand'
import ListCommand from './ListCommand'
import RetrCommand from './RetrCommand'
import RnfrCommand from './RnfrCommand'

import OptsCommand from './OptsCommand'
import QuitCommand from './QuitCommand'



export default {

  parse(message: string, ftpConnection: FTPConnection): Command {
    // since the message will contain \r\n lets remove it
    message = message.substring(0, message.length - 2)
    const messageParts = message.split(" ")

    // extract the command
    const cmd = messageParts[0].toLowerCase()

    // check if we support that command
    let clazz = CommandMap[cmd];
    if (!clazz) {
      clazz = UnknownCommand;
    }
    // extract the arguments
    const args = messageParts.splice(1, messageParts.length - 1)
    const retVal = new clazz(cmd, args, ftpConnection)

    return retVal
  }

}

const CommandMap = {
  user: UserCommand,
  pass: PassCommand,
  pwd: PwdCommand,
  cwd: CwdCommand,
  type: TypeCommand,
  // syst: "doSyst",
  // feat: "doFeat",
  opts: OptsCommand,
  // pasv: "doPasv",
  port: PortCommand,
  list: ListCommand,
  // cwd: 'doCwd',
  // epsv: "doEpsv",
  // eprt: "doEprt",
  // mkd: "doMkdir",
  // cdup: "doCdUp",
  rnfr: RnfrCommand,
  // rnto: "doRnto",
  // dele: "doDele",
  // rmd: "doDele",
  retr: RetrCommand,
  // stor: "doStor",
  // appe: "doAppe",
  quit: QuitCommand
}
