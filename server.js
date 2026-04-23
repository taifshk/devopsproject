const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0';
const PORT = 5000;

const server = http.createServer((req, res) => {
    const requestUrl = req.url === '/' ? 'index.html' : req.url;

    // List of possible places to look for the file
    const possiblePaths = [
        path.join(__dirname, 'frontend', requestUrl),     // Try folder 'frontend'
        path.join(__dirname, 'Frontend', requestUrl),     // Try folder 'Frontend'
        path.join(__dirname, requestUrl)                  // Try main root folder
    ];

    let foundPath = null;

    // Check which path actually has the file
    for (const p of possiblePaths) {
        if (fs.existsSync(p) && !fs.lstatSync(p).isDirectory()) {
            foundPath = p;
            break;
        }
    }

    if (!foundPath) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<h1>404 Not Found</h1><p>The Chef looked in root and frontend folders but found nothing.</p>`);
        return;
    }

    const extname = path.extname(foundPath).toLowerCase();
    const contentType = extname === '.css' ? 'text/css' : 'text/html';

    fs.readFile(foundPath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, hostname, () => {
    console.log(`Chef is alive! Listening on port ${PORT}`);
});