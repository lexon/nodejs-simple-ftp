"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Logger_1 = require("./Logger");
const log = new Logger_1.default("FilesystemList");
class FilesystemList {
    getList(directory) {
        const files = fs.readdirSync(directory) || [];
        const totalCount = files.length;
        let responseString = "\r\n";
        responseString += "total " + totalCount + "\r\n";
        files.forEach(fileName => {
            const filePath = `${directory}/${fileName}`;
            const stats = fs.statSync(filePath);
            var filePermissions = this.permissionsForFile(stats.mode);
            let fileCountFiles = stats.isDirectory() ? fs.readdirSync(filePath).length : 1;
            fileCountFiles = fileCountFiles < 1 ? 1 : fileCountFiles;
            let countFiles = fileCountFiles.toString();
            var fileOwner = stats.uid.toString();
            var fileGroup = stats.gid.toString();
            var fileSize = stats.size.toString();
            var fileModified = this.modifedDate(stats);
            const fileString = `${filePermissions} ${countFiles} ${fileOwner} ${fileGroup} ${fileSize} ${fileModified} ${fileName}\r\n`;
            responseString += fileString;
        });
        log.info(`sending file list to client ${responseString}`);
        return responseString;
    }
    permissionsForFile(mode) {
        const ownerRead = mode & 400 ? 'r' : '-';
        const ownerWrite = mode & 200 ? 'w' : '-';
        const ownerExecute = mode & 100 ? 'x' : '-';
        const ownerPremissions = `${ownerRead}${ownerWrite}${ownerExecute}`;
        const groupRead = mode & 40 ? 'r' : '-';
        const groupWrite = mode & 20 ? 'w' : '-';
        const groupExecute = mode & 10 ? 'x' : '-';
        const groupPremissions = `${groupRead}${groupWrite}${groupExecute}`;
        const othersRead = mode & 4 ? 'r' : '-';
        const othersWrite = mode & 2 ? 'w' : '-';
        const othersExecute = mode & 1 ? 'x' : '-';
        const othersPremissions = `${othersRead}${othersWrite}${othersExecute}`;
        const fileType = mode & 0o0040000 ? 'd' : '-';
        let permission = `${fileType}${ownerPremissions}${groupPremissions}${othersPremissions}`;
        return permission;
    }
    modifedDate(stats) {
        const date = stats.mtime;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonthName = months[date.getMonth()];
        const halfYearInMS = 15552000000;
        const isOlderThan6Month = (new Date().getTime() - date.getTime()) > halfYearInMS;
        const timeOrYear = isOlderThan6Month ? `${date.getFullYear()}` : `${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`;
        let formattedTime = `${date.getDate()} ${currentMonthName} ${timeOrYear}`;
        return formattedTime;
    }
    addZero(i) {
        i = i < 10 ? "0" + i : i;
        return i;
    }
}
exports.default = FilesystemList;
//# sourceMappingURL=FilesystemList.js.map