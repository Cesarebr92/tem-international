const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://api.binance.com/api/v3',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
})

module.exports = instance