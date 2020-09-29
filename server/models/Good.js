const mongoose = require('mongoose');
const schema = new mongoose.Schema(
  {
    cover: {
      type: String,
      default: '',
    },
    images: {
      type: Array,
      default: [],
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
    price:{
      type: Number,
      required: true
    },
    through_price: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Good', schema);
