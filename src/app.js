require('./config/config');
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
let server = http.createServer(app);

app.use(cors());

app.use( bodyParser.json() );

app.use( require( './api/routes' ) );

mongoose.connect(process.env.URLDB,  (err, res) => {
    if (err) throw err;
    console.log('DataBase is ONLINE')
});

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})

