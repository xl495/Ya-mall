const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  attribute: {
      type: Array,
      required: true
  },
  spec: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GoodSpec',
  },
});
module.exports = mongoose.model('goodAttribute', schema);
