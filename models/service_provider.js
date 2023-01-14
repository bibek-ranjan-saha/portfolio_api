const monngoose = require('mongoose');

const serviceProviderSchema = new monngoose.Schema({
    org : {
        type : String,
        trim : true,
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