const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    cover: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Article', schema);