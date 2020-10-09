const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title: {
        type: String,
        default: '分类名称'
    },
    sort:{
        type: Number,
        default: 0
    },
    type:{
        type: String,
        required: true
    },
    url: {
        type: String,
        default: false
    }
});
module.exports = mongoose.model('Swiper', schema);