const mongoose = require('mongoose');


let Schema = mongoose.Schema;

let pairSchema = new Schema({
    symbol: {
        type: String,
        unique: true,
        required: [true, 'Symbol is required']
    },
    average: {
      type: String,
    }
});

module.exports = mongoose.model('Pair', pairSchema);