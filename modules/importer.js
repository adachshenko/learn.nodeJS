import * as fs from 'fs';
import {DATA_DIR} from '../config'

export class Importer {

    constructor(dirWatcher) {
        dirWatcher.on("dirwatcher:changed", this.importSync.bind(this));
        dirWatcher.on("dirwatcher:changed", (pathArr) => (pathArr.forEach((path) => {
            this.import(path).then( result => console.log(result) );
    })))
    };

    import(path) {
        return new Promise( (resolve) => resolve(this.convertCsvToJson(this.getCsvString(DATA_DIR + path))));
    }

    importSync(pathArr){
        pathArr.forEach((path) => {
            console.log(this.convertCsvToJson(this.getCsvString(DATA_DIR + path)))

        });

    }

    convertCsvToJson(parsedCsv) {
        let jsonResult = [];
        let headers = [];

        parsedCsv.split('\r\n').forEach((line, i) => {
                let arrayFromLine = line.split(',');
                let jsonObject = {};

                if (i === 0) {
                    headers = arrayFromLine;
                } else {
                    arrayFromLine.forEach((item, i) => {
                        jsonObject[headers[i]] = item;
                    })
                    jsonResult.push(jsonObject);
                }

            }
        );
        return jsonResult;
    }

    getCsvString(fileName) {
        return fs.readFileSync(fileName).toString();
    }

}