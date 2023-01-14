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
    latlong : {
        type : String,
        trim : true,
    },
    count : {
        default : 1,
        type : Number,
    }
});

module.exports = regionSchema;