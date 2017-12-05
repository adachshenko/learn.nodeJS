let http = require('http');
let url =  require('url');
let express = require('express');

http.createServer((req, res) => {
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });
    res.on('error', (err) => {
        console.error(err);
    });
    let urlParsed = url.parse(req.url, true);
    if (req.method === 'GET' && req.url.startsWith('/echo')) {
        req.pipe(res);
        res.end( urlParsed.query.message );
    } else {
        res.statusCode = 404;
        res.end("Page not found");
    }
}).listen(8100);