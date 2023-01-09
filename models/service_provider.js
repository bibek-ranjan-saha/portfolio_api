const monngoose = require('mongoose');

const serviceProviderSchema = new monngoose.Schema({
    isp : {
        type :  String,
        trim : true,
    },
    org : {
        type : String,
        trim : true,
    },
    as : {
        type : String,
        default : "Unknown",
    },
    ip : {
        required : true,
        type : String
    },
    count : {
        default : 1,
        type : Number,
    }
});

module.exports = serviceProviderSchema;