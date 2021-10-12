const express = require('express');
const api_helper = require('../../services/crypto-pair');
const app = express();

app.get('/crypto/average', (req, res) => {
    let symbol = req.query.symbol || '';
    let lectures = req.query.lectures || '';

    api_helper.getCryptoPairBySymbol(symbol)
        .then(resp => {
            res.json(resp)
        })
        .catch(err => {
            res.status(err.status).json({
                ok: false,
                error: err.msg
            })
        })
});

app.get('/crypto/pairs', (req, res) => {
    api_helper.getCryptoPair()
        .then(resp => {
            res.json(resp)
        })
        .catch(err => {
            res.status(err.status).json({
                ok: false,
                error: err.msg
            })
        })
});

app.post('/crypto/pairs',  (req, res) => {
    let body = req.body;
    api_helper.createCryptoPair(body.symbol.toUpperCase())
        .then(resp => {
            res.json(resp)
        })
        .catch(err => {
            res.status(err.status).json({
                ok: false,
                error: err.msg
            })
        });

});



module.exports = app;