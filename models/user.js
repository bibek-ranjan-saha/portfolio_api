const mongoose = require('mongoose');
const serviceProviderSchema = require('./service_provider');
const countrySchema = require('./country');
const regionSchema = require('./region');
const citySchema = require('./city');

const usersSchema = new mongoose.Schema({
    totalCount : {
        type : Number,
        default : 1,
    },
    countries : [countrySchema],
    cities : [citySchema],
    regions : [regionSchema],
    serviceProviders : [serviceProviderSchema],
});

const usersModel = mongoose.model("Users",usersSchema);

module.exports = usersModel;