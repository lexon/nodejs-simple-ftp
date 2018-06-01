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

  public rename(oldPath: string, newPath: string): boolean {
    let retVal = false

    try {
      fs.renameSync(oldPath, newPath)
      retVal = true
    } catch (e) {
      log.error(`rename error for file from '${oldPath}' to ${newPath}`, e)
    }

    return retVal
  }

  public unlink(path: string): boolean {
    let retVal = false

    try {
      fs.unlinkSync(path)
      retVal = true
    } catch (e) {
      log.error(`unlink error for file '${path}'`, e)
    }

    return retVal
  }

  public mkdir(path: string): boolean {
    let retVal = false

    try {
      fs.mkdirSync(path)
      retVal = true
    } catch (e) {
      log.error(`mkdir error for file '${path}'`, e)
    }

    return retVal
  }

  public rmdir(path: string): boolean {
    let retVal = false

    try {
      fs.rmdirSync(path)
      retVal = true
    } catch (e) {
      log.error(`rmdir error for file '${path}'`, e)
    }

    return retVal
  }


  public access(path: string, mode?: number): boolean {
    let retVal = false

    try {
      fs.accessSync(path, mode)
      retVal = true
    } catch (e) {
      log.error(`access error for '${path}'`, e)
    }

    return retVal
  }

  public hasWriteAccess(path: string): boolean {
    return this.access(path, fs.constants.W_OK)
  }

  public hasReadAccess(path: string): boolean {
    return this.access(path, fs.constants.R_OK)
  }

  public getFilepath(filename): string {
    let absolutePath;

    log.info(`Requested filepath for file: ${filename}`)
    log.info(`Current directory ${this.currentDirectory}`)

    if (filename.indexOf('/') === 0) {
      // absolutePath = `${this.sandboxRootDirectory ? this.ftpBaseDir : this.ftpBaseDir}${filename}`

      // if file name is only "/", we do not want to append that
      if (filename.length == 1) {
        filename = ""
      }

      absolutePath = `${this.ftpBaseDir}${filename}`
    } else {
      absolutePath = `${this.currentDirectory}/${filename}`
    }

    log.info(`Absolute file path: ${absolutePath}`)

    return absolutePath;
  }

  public changeCurrentDirectory(newDirectory: string): boolean {
    let retVal = false

    log.info(`Change directory requested for: ${newDirectory}`)

    newDirectory = this.getFilepath(newDirectory)
    log.info(`New directory: ${newDirectory}`)

    if (this.canChangeDirectory(newDirectory)) {
      this.currentDirectory = newDirectory;
      log.info(`Directory changed to: ${newDirectory}`)

      retVal = true;
    } else {
      log.info(`Directory change failed.`)
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
