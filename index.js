const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const HOST = 'localhost';

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
    
    // Lecture et envoi du fichier HTML
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            // En cas d'erreur de lecture du fichier
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>Erreur 500 - Erreur serveur interne</h1>');
            console.error('Erreur lors de la lecture du fichier:', err);
        } else {
            // Si tout va bien, on envoie le contenu
            if (res.statusCode !== 404) {
                res.statusCode = 200;
            }
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(content);
        }
    });
});

// Démarrage du serveur
server.listen(PORT, HOST, () => {
    console.log(`✅ Serveur démarré avec succès !`);
    console.log(`🌐 Accédez au serveur sur : http://${HOST}:${PORT}`);
    console.log(`\nPages disponibles :`);
    console.log(`   - http://${HOST}:${PORT}/`);
    console.log(`   - http://${HOST}:${PORT}/about`);
    console.log(`   - http://${HOST}:${PORT}/contact-me`);
    console.log(`\nAppuyez sur Ctrl+C pour arrêter le serveur.`);
});