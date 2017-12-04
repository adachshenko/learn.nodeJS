//import * as http from 'http';  ?!
let http = require('http');

http.createServer(function (req, res) {
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });
    res.on('error', (err) => {
        console.error(err);
    });
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World');
    res.end();
}).listen(8000);