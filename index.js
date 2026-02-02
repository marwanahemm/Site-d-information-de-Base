const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const HOST = 'localhost'

const server = http.createServer((req, res) => {
    let url = req.url;

   let filePath;
    
    if (url === '/') {
        filePath = path.join(__dirname, 'index.html');
    } else if (url === '/about') {
        filePath = path.join(__dirname, 'about.html');
    } else if (url === '/contact-me') {
        filePath = path.join(__dirname, 'contact-me.html');
    } else {
        // Si la page n'existe pas, on affiche la page 404
        filePath = path.join(__dirname, '404.html');
        res.statusCode = 404;
    }
});

fs.readFile(filePath, (err, data) => {
    
})