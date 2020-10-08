module.exports = app => {
    const mongoose = require('mongoose');
    const { DB_link , DB_name } = require('../config') 
    mongoose.connect(`${DB_link}${DB_name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    require('require-all')(__dirname + '/../models')
}