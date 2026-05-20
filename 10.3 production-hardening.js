const http = require('http');
const PORT = process.env.PORT || process.argv[2] || 3000;
const server = http.createServer((req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS' && req.url === '/health') {
        res.statusCode = 204;
        return res.end();
    }
    if (req.method === 'GET' && req.url === '/health') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ ok: true }));
    }
    if (req.method === 'GET' && req.url === '/boom') {
        try {
            throw new Error('Boom triggered');
        } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Internal Server Error');
        }
    }
    res.statusCode = 404;
    res.end();
});

process.on('uncaughtException', (err) => {
    console.error('Caught exception:', err);
});

server.listen(PORT, () => {
    console.log(`Port ${PORT}`);
});
