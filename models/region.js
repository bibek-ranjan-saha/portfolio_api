const monngoose = require('mongoose');

const regionSchema = new monngoose.Schema({
    name : {
        type :  String,
        trim : true,
    },
    code : {
        type : String,
        trim : true,
    },
    timeZone : {
        type : String,
        trim : true,
    },
    lat : {
        type : Number
    },
    long : {
        type : Number
    },
    count : {
        default : 0,
        type : Number,
    }
});

module.exports = regionSchema;