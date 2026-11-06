#!/usr/bin/env node
/**
 * Servidor estático local para testar a pasta game/ no navegador.
 * Uso: node tools/serve.js [porta]
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'game');
const PORT = Number(process.argv[2] || 8080);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ogg': 'audio/ogg',
  '.woff': 'font/woff',
  '.efkefc': 'application/octet-stream',
  '.wasm': 'application/wasm',
  '.rmmzproject': 'text/plain; charset=utf-8',
};

http
  .createServer((req, res) => {
    let pathname = decodeURIComponent(req.url.split('?')[0]);
    if (pathname === '/') pathname = '/index.html';

    const file = path.resolve(ROOT, '.' + pathname);
    if (!file.startsWith(ROOT + path.sep)) {
      res.writeHead(403);
      res.end('403');
      return;
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404 ' + pathname);
        return;
      }
      res.writeHead(200, {
        'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
      });
      res.end(data);
    });
  })
  .listen(PORT, () => {
    console.log(`servindo ${ROOT} em http://localhost:${PORT}`);
  });
