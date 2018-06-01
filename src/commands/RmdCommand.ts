import DeleCommand from './DeleCommand'

export default class RmdCommand extends DeleCommand {

  protected deleteFile(filepath: string): boolean {
    return this.ftpConnection.fileSystem.rmdir(filepath)
  }

}
