const express = require('express');
const app = express();

app.use( require('./crypto') );

module.exports = app;