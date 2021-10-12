const cron = require('node-cron');
const axios = require('../helpers/axiosInstance');
const Pair = require('../models/pairs');


const createCryptoPair = (symbol) => {
    return new Promise((resolve, reject) => {
        axios.get(`/avgPrice`, {params: {symbol}})
            .then(resp => {
                let newPair = new Pair({
                    symbol: symbol,
                    average: resp.data.price
                })
                newPair.save((err, userDB)=> {
                    resolve({
                        ok: true,
                        message: `Pair ${symbol} created successfully`
                    })
                })

            })
            .catch(err => {
                reject({
                    ok: false,
                    status: err.response.status,
                    msg: err.response.data.msg
                });
            })
    })
}

const getCryptoPair = () => {
    return new Promise((resolve, reject) => {
        Pair.find( {},'id symbol', (err, pair)=> {
            if (err) {
                reject({
                    ok: false,
                    status: 500,
                    msg: err
                })
            }
            else {
                resolve({
                    ok: true,
                    result: pair
                })
            }
        })
    })
}

const getCryptoPairBySymbol = (symbol) => {
  return new Promise((resolve, reject) => {
      Pair.findOne({symbol: symbol}, 'symbol, average', (err, pair) => {
          if (err) {
              reject({
                  ok: false,
                  status: 500,
                  msg: err
              })
          }
          else if(!pair){
              reject({
                  ok: false,
                  status: 401,
                  msg: 'Invalid symbol, try to add or get another one pair'
              })
          }
          else{
              resolve({
                  ok: true,
                  result: pair
              })
          }
      })
  })
}

const updateCryptoPair = () => {
    getCryptoPair()
        .then(resp => {
            const arrayResult = resp.result
            arrayResult.forEach((pair, index)=> {
                createCryptoPair(pair.symbol)
                    .then(secResp => {
                        console.log(`Pair ${pair.symbol} updated successfully`);
                    })
                    .catch(err => {
                        console.log(`Pair ${pair.symbol} doesn't update`);
                    })
            })
        })
        .catch()
}

const task = cron.schedule('*/60 * * * *', updateCryptoPair,
    {
        scheduled: true,
        timezone: "America/Caracas"
    })
task.start();

module.exports = {
    createCryptoPair,
    getCryptoPair,
    updateCryptoPair,
    getCryptoPairBySymbol
}