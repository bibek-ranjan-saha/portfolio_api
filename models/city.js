const monngoose = require('mongoose');

const citySchema = new monngoose.Schema({
    name : {
        type :  String,
        trim : true,
    },
    count : {
        default : 0,
        type : Number,
    }
});

module.exports = citySchema;