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

    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>Erreur interne du serveur</h1>'); 
            console.error('Erreur lors de la lecture du fichier:', err);
           
        if (res.statusCode !== 404) {
                res.statusCode = 200;
            }
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(content);
        }
    });

server.listen(PORT, HOST, () => {
    console.log(`Le serveur démarré avec succès !`);
    console.log(`Accédez au serveur à l'adresse http://${HOST}:${PORT}`);
    console.log(`\nPages disponibles:`);
    console.log(`   - http://${HOST}:${PORT}/`);
    console.log(`   - http://${HOST}:${PORT}/about`);
    console.log(`   - http://${HOST}:${PORT}/contact-me`);
    console.log(`\nAppuyez sur Ctrl+C pour arrêter le serveur.`);
    
});