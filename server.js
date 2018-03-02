const express = require('express');
const http = require('http')
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(process.env.PORT || 8080);