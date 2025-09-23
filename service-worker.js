// server.js
// Un servidor simple usando Express para servir el archivo HTML.

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Sirve el archivo HTML directamente
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'saldo_magico.html'));
});

// Sirve archivos estáticos (CSS, JS, imágenes, etc.) desde el directorio actual
app.use(express.static(__dirname));

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
  console.log('Abre esta URL en tu navegador para ver la aplicación.');
});
