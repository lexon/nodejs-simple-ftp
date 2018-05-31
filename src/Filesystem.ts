import * as fs from 'fs'
import * as stream from 'stream'

import FilesystemList from './FilesystemList'

import Logger from './Logger'
const log = new Logger("Filesystem")

export default class Filesystem {

  private fsList: FilesystemList

  constructor(private ftpBaseDir: string, public currentDirectory: string, private sandboxRootDirectory: boolean) {
    this.fsList = new FilesystemList()
  }


  public exists(path: string): boolean {
    return fs.existsSync(path)
  }

  public isDirectory(path: string): boolean {
    return fs.statSync(path).isDirectory()
  }


  public getFilepath(filename): string {
    let absolutePath = filename;

    if (filename.indexOf('/') === 0) {
      absolutePath = `${this.sandboxRootDirectory ? this.ftpBaseDir : this.ftpBaseDir}${filename}`
    } else {
      absolutePath = `${this.currentDirectory}/${filename}`
    }

    return absolutePath;
  }

  public changeCurrentDirectory(newDirectory: string): boolean {
    let retVal = false

    newDirectory = this.getFilepath(newDirectory)
    if (this.canChangeDirectory(newDirectory)) {
      this.currentDirectory = newDirectory;
      retVal = true;
    }

    return retVal;
  }

  public getCurrentVisibleDirectory(): string {
    var visibleDirectory = this.currentDirectory;

    // if (this.sandboxRootDirectory) {
    //   visibleDirectory = this.currentDirectory.substring(this.ftpBaseDir.length);
    // } else {
    visibleDirectory = this.currentDirectory.substring(this.ftpBaseDir.length);
    // }

    log.debug("this.currentDirectory", this.currentDirectory)
    log.debug("this.ftpBaseDir", this.ftpBaseDir)

    if (visibleDirectory.indexOf('/') !== 0) {
      visibleDirectory = `/${visibleDirectory}`;
    }

    return visibleDirectory;
  }

  public canChangeDirectory(path) {
    let retVal = fs.existsSync(path)

    return retVal;
  }

  public getList(directory: string) {

    return this.fsList.getList(directory)
  }


  public createReadStream(filepath: string): stream.Readable {
    let stream = null;

    if (fs.existsSync(filepath)) {
      stream = fs.createReadStream(filepath, { 'highWaterMark': 4096 * 1024 })
    }

    return stream
  }

}
