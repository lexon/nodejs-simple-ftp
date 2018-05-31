"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const FilesystemList_1 = require("./FilesystemList");
const Logger_1 = require("./Logger");
const log = new Logger_1.default("Filesystem");
class Filesystem {
    constructor(ftpBaseDir, currentDirectory, sandboxRootDirectory) {
        this.ftpBaseDir = ftpBaseDir;
        this.currentDirectory = currentDirectory;
        this.sandboxRootDirectory = sandboxRootDirectory;
        this.fsList = new FilesystemList_1.default();
    }
    exists(path) {
        return fs.existsSync(path);
    }
    isDirectory(path) {
        return fs.statSync(path).isDirectory();
    }
    getFilepath(filename) {
        let absolutePath = filename;
        if (filename.indexOf('/') === 0) {
            absolutePath = `${this.sandboxRootDirectory ? this.ftpBaseDir : this.ftpBaseDir}${filename}`;
        }
        else {
            absolutePath = `${this.currentDirectory}/${filename}`;
        }
        return absolutePath;
    }
    changeCurrentDirectory(newDirectory) {
        let retVal = false;
        newDirectory = this.getFilepath(newDirectory);
        if (this.canChangeDirectory(newDirectory)) {
            this.currentDirectory = newDirectory;
            retVal = true;
        }
        return retVal;
    }
    getCurrentVisibleDirectory() {
        var visibleDirectory = this.currentDirectory;
        visibleDirectory = this.currentDirectory.substring(this.ftpBaseDir.length);
        log.debug("this.currentDirectory", this.currentDirectory);
        log.debug("this.ftpBaseDir", this.ftpBaseDir);
        if (visibleDirectory.indexOf('/') !== 0) {
            visibleDirectory = `/${visibleDirectory}`;
        }
        return visibleDirectory;
    }
    canChangeDirectory(path) {
        let retVal = fs.existsSync(path);
        return retVal;
    }
    getList(directory) {
        return this.fsList.getList(directory);
    }
    createReadStream(filepath) {
        let stream = null;
        if (fs.existsSync(filepath)) {
            stream = fs.createReadStream(filepath, { 'highWaterMark': 4096 * 1024 });
        }
        return stream;
    }
}
exports.default = Filesystem;
//# sourceMappingURL=Filesystem.js.map