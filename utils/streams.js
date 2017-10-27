//import * as parseArgs from 'minimist';
/*process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
});*/

let argsArr = process.argv;

let args = require('minimist')(argsArr.slice(2), {
    alias: {
        'help': 'h',
        'action': 'a'
    },
    unknown: (arg) => {
        if (arg !== 'help' && arg !== 'h' && arg !== 'action' && arg !== 'a') {
            console.error('Unknown option: ', arg);
            return false;
        }
    }
});
console.dir(args);

if (args.help) {
    console.log('superman is here!');
}
if (argsArr.length <= 2){
    console.log('Incorrect input. Use --action="nameAction"/-a "nameAction" for executing an action. ' +
        '\nOr --help/-h for getting more information about using of this program');
}