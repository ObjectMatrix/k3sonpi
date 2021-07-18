'use strict';

const express = require('express');

const PORT = 7080;
const HOST = '0.0.0.0';


const app = express();
app.get('/', (req, res) => {
  res.send('IMMP Team: Hello W, Hello K');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
