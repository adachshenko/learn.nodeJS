var fs = require('fs');

let argsArr = process.argv;

let args = require('minimist')(argsArr.slice(2), {
    alias: {
        'help': 'h',
        'action': 'a',
        'file': 'f'
    },
    unknown: (arg) => {
        if (arg !== 'file' && arg !== 'f' && arg !== 'help' && arg !== 'h' && arg !== 'action' && arg !== 'a') {
            console.error('Unknown option: ', arg);
            return false;
        }
    }
});
console.dir(args);

if (args.help) {
    printHelpMessage();
}
if (args.action === 'read' && args.file !== undefined) {
    readFile(args.file);
}
if (args.action === 'upperCase') {
    convertToUpperCase();
}
if (argsArr.length <= 2) {
    console.log('Incorrect input. Use --action="nameAction"/-a "nameAction" for executing an action. ' +
        '\nOr --help/-h for getting more information about using of this program');
}

function readFile(filePath) {
    let readStream = fs.createReadStream(filePath);
    readStream.on('open', function () {
        readStream.pipe(process.stdout);
    });

    readStream.on('error', function (err) {
        process.stdout.write(`Error during reading file ${err}`);
    });
}

function convertToUpperCase() {
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
        const chunk = process.stdin.read();
        if (chunk !== null) {
            process.stdout.write(`You have entered : ${chunk.toUpperCase()}`);
        }
    });

    process.stdin.on('end', () => {
        process.stdout.write('end');
    });

}

function convertCsvToJson() {

}

function cssBundler() {

}

function printHelpMessage() {
    console.log('superman is here!');
}