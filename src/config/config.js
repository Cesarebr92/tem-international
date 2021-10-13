//================================
// CHAI + SUPERTEST
//================================
const superTest = require('supertest')('http://localhost:3000');
const expect = require('chai').expect;

//================================
// Port
//================================
process.env.PORT = process.env.PORT || 3000;

//================================
// Env
//================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;
if ( process.env.NODE_ENV === 'dev'){

    urlDB = 'mongodb://localhost:27017/Crypto';

}
else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;


module.exports = {
    superTest,
    expect,
}