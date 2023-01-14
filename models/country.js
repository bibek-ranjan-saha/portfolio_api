const monngoose = require('mongoose');

const countrySchema = new monngoose.Schema({
    name : {
        type :  String,
        trim : true,
    },
    count : {
        default : 1,
        type : Number,
    }
});

module.exports = countrySchema;