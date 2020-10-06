const mongoose = require('mongoose');
const schema = new mongoose.Schema(
  {
    cover: {
      type: String,
      default: '',
    },
    images: {
      type: String, //数组的话前端传不过来
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    views: {
      type: Number,
      default: 0,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    isSku: {
      type: Boolean,
      default: false,
    },
    spec: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'goodAttribute',
    },
    price: {
      type: Number,
      required: true,
    },
    through_price: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Good', schema);
