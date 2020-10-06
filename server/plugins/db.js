module.exports = app => {
    const mongoose = require('mongoose');
    const { DB_link } = require('../config') 
    mongoose.connect(DB_link, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    require('require-all')(__dirname + '/../models')
}