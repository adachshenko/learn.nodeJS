let fs = require('fs');
let through2 = require('through2');
let csv = require('csv-parser');
let request = require('request');
const BOTTOM_CSS = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';

    let argsArr = process.argv;

    let args = require('minimist')(argsArr.slice(2), {
        alias: {
            'help': 'h',
            'action': 'a',
            'file': 'f',
            'path': 'p',
        },
        unknown: (arg) => {
            if (arg !== 'file' && arg !== 'f' && arg !== 'help' && arg !== 'h' && arg !== 'action' && arg !== 'a'
                && arg !== 'path' && arg !== 'p') {
                console.error('Unknown option: ', arg);
                return false;
            }
        }
    });

    if (argsArr.length <= 2) {
        console.log('Incorrect input. Use --action="nameAction"/-a "nameAction" for executing an action. ' +
            '\nOr --help/-h for getting more information about using of this program');
    }

    if (args.help) {
        printHelpMessage();
    }

    switch (args.action) {
        case 'read':
            readFile(args.file);
            //node streams.js -a read -f test.txt
            break;
        case 'upperCase':
            convertToUpperCase();
            break;
        case 'csvToJsonInFile':
            convertCsvToJson(args.file, true);
            //node streams.js -a csvToJson -f test.csv
            break;
        case 'csvToJson':
            convertCsvToJson(args.file);
            //node streams.js -a csvToJson
            break;
        case 'bundleCss':
            cssBundler(args.path);
            //node streams.js -a bundleCss -p ../data/css/
            break;
}
function readFile(filePath) {
    if (filePath !== undefined) {
        let readStream = fs.createReadStream(filePath);
        readStream.on('open', function () {
            readStream.pipe(process.stdout);
        });

        readStream.on('error', function (err) {
            process.stdout.write(`Error during reading file: ${err}`);
        });
    } else console.log('Enter file name!');

}

function convertToUpperCase() {
    process.stdin.setEncoding('utf8');
    process.stdin.pipe(through2(function (chunk, enc, callback) {
        let result = chunk.toString().toUpperCase();

        this.push(result)
        callback()
    }))
        .pipe(process.stdout);
}

function convertCsvToJson(filePath, inFile) {
    if (filePath !== undefined) {
        let readStream = fs.createReadStream(filePath)
            .on('error', function (err) {
                process.stdout.write(`Error during reading file: ${err}`);
            })
            .pipe(csv(['id', 'name', 'age']))
            .pipe(through2.obj(function (chunk, encoding, callback) {
                this.push(JSON.stringify(chunk))
                callback()
            }))
        if (inFile === true) {
            readStream.pipe(fs.createWriteStream(filePath.replace(/\.[^/.]+$/, ".json")));
        } else readStream.pipe(process.stdout);
    } else console.log('Enter file name!');
}

function cssBundler(folderPath) {
    if (folderPath !== undefined) {
        let writeStream = fs.createWriteStream(`${folderPath}bundle.css`);

        request.get(BOTTOM_CSS, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let text = body;
                writeStream.write(`${text}\n`);
                fs.readdir(folderPath, (err, files) => {

                    files.forEach(file => {
                        fs.createReadStream(folderPath + file).pipe(writeStream);
                    });

                })
            } else console.log(`ERROR: ${error}`)
        });
    } else console.log("Enter path to CSS files!");
}

function printHelpMessage() {
    console.log('superman is here!');
}
