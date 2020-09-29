const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    icon: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: '分类名称'
    },
    desc: {
        type: String,
        default: '分类描述'
    },
    isShow: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('Category', schema);