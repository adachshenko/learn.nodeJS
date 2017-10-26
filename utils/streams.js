process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
});

let args = process.argv;

if (args[2] === '--help') {
    console.log('superman is here!');
}