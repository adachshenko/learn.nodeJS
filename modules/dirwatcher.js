import * as fs from 'fs';
import {EventEmitter} from 'events';

export class DirWatcher extends EventEmitter {

    constructor() {
        super();
    }

    watch(path, delay) {
        console.log("Start dir");
        let files = [];
        setInterval(() => fs.readdir(path, (err, checkedFiles) => {
            if (err) {
                console.log("Can't read folder")
                throw err;
            }
            let addedFiles = this.getAddedFiles(files, checkedFiles);
            if (addedFiles.length) {
                this.emit('dirwatcher:changed', addedFiles);
                files = checkedFiles;
            }
        }), delay);
    }

    getAddedFiles(oldArr, newArr) {
        return newArr.filter(i => oldArr.indexOf(i) < 0
        );
    }
}