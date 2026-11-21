const express = require('express');

const app = express();

app.get('/', (_req, res) => {
  res.type('text/plain').send('KT3 App');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
