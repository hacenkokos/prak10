const http = require('http');
const PORT = process.env.PORT || process.argv[2] || 3000;
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('OK');
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Port ${PORT}`);
});
