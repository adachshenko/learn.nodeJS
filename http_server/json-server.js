let http = require('http');
const PRODUCT = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [{color: 'blue'}, {size: 'XL'}]
}

http.createServer(function (req, res) {
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });
    res.on('error', (err) => {
        console.error(err);
    });
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(PRODUCT));
    res.end();

}).listen(8000);