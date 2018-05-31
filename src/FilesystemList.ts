import * as fs from 'fs'

import Logger from './Logger'
const log = new Logger("FilesystemList")

export default class FilesystemList {

  public getList(directory: string) {

    const files = fs.readdirSync(directory) || []
    const totalCount = files.length;

    let responseString = "\r\n";
    responseString += "total " + totalCount + "\r\n";

    // loop files
    files.forEach(fileName => {
      const filePath = `${directory}/${fileName}`;

      const stats = fs.statSync(filePath);
      var filePermissions = this.permissionsForFile(stats.mode)
      let fileCountFiles = stats.isDirectory() ? fs.readdirSync(filePath).length : 1;
      fileCountFiles = fileCountFiles < 1 ? 1 : fileCountFiles;
      let countFiles: string = fileCountFiles.toString()

      var fileOwner: string = stats.uid.toString()
      var fileGroup: string = stats.gid.toString()
      var fileSize = stats.size.toString()
      var fileModified = this.modifedDate(stats)

      const fileString = `${filePermissions} ${countFiles} ${fileOwner} ${fileGroup} ${fileSize} ${fileModified} ${fileName}\r\n`
      responseString += fileString;
    })

    log.info(`sending file list to client ${responseString}`)
    return responseString;
  }

  private permissionsForFile(mode) {
    const ownerRead = mode & 400 ? 'r' : '-'
    const ownerWrite = mode & 200 ? 'w' : '-'
    const ownerExecute = mode & 100 ? 'x' : '-'
    const ownerPremissions = `${ownerRead}${ownerWrite}${ownerExecute}`

    const groupRead = mode & 40 ? 'r' : '-'
    const groupWrite = mode & 20 ? 'w' : '-'
    const groupExecute = mode & 10 ? 'x' : '-'
    const groupPremissions = `${groupRead}${groupWrite}${groupExecute}`

    const othersRead = mode & 4 ? 'r' : '-'
    const othersWrite = mode & 2 ? 'w' : '-'
    const othersExecute = mode & 1 ? 'x' : '-'
    const othersPremissions = `${othersRead}${othersWrite}${othersExecute}`

    // const fileType = mode & 0o0100000 ? 'f' : (mode & 0o0040000 ? 'd' : '-')
    const fileType = mode & 0o0040000 ? 'd' : '-'

    let permission = `${fileType}${ownerPremissions}${groupPremissions}${othersPremissions}`

    return permission
  }


  private modifedDate(stats): string {
    const date: Date = stats.mtime

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentMonthName = months[date.getMonth()]

    const halfYearInMS = 15552000000
    const isOlderThan6Month: boolean = (new Date().getTime() - date.getTime()) > halfYearInMS
    const timeOrYear = isOlderThan6Month ? `${date.getFullYear()}` : `${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`


    let formattedTime = `${date.getDate()} ${currentMonthName} ${timeOrYear}`//"31 Mai 14:32"

    return formattedTime
  }

  private addZero(i) {
    i = i < 10 ? "0" + i : i

    return i;
  }
}
