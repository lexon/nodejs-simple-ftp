import Command from './Command'

export default class CwdCommand extends Command {

  //	250
  //	500, 501, 502, 421, 530, 550
  //	250 CWD command successful.

  public replyCommand(): string {
    let reply = `550 CWD failed.`
    console.log("cwd args", this.args);
    let directory = this.generatePathFromArguments(this.args);
    if (this.ftpConnection.fileSystem.changeCurrentDirectory(directory)) {
      reply = `250 "${this.ftpConnection.fileSystem.getCurrentVisibleDirectory()}" CWD command successful.`
    }

    return reply
  }

  generatePathFromArguments(args) {
    let path = "";
    for (let i = 0; i < args.length; i++) {
      path += args[i] + " ";
    }

    path = path.substring(0, path.length - 1);

    return path;
  }
}
