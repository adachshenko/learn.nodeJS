let http = require('http');
let fs = require('fs');

http.createServer(function (req, res) {
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });
    res.on('error', (err) => {
        console.error(err);
    });

    fs.readFile('../data/html/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
}).listen(8000);

http.createServer(function (req, res) {
    req.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });
    res.on('error', (err) => {
        console.error(err);
    });
     fs.createReadStream('../data/html/index2.html').pipe(res);
}).listen(8100);