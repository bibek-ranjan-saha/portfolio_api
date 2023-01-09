const mongoose = require('mongoose');
const url = 'mongodb+srv://bibek_db_user:test123@cluster0.yr0rkzg.mongodb.net/?retryWrites=true&w=majority';

const connectTODB = async()=>{
    mongoose.connect(url,()=>{
        console.log("mongo is connected suessfully");
    });
}

module.exports = connectTODB;