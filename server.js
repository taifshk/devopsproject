const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0';
const PORT = 5000;

const server = http.createServer((req, res) => {
   
    let filePath = path.join(__dirname, 'frontend', req.url === '/' ? 'index.html' : req.url);

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    if (extname === '.css') contentType = 'text/css';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('Error: Spicy Burger Page Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, hostname, () => {
    console.log(`Chef is ready! Restaurant running at http://localhost:${PORT}/`);
});