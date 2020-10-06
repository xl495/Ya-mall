const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  spec: {
      type: Array,
      required: true
  }
});
module.exports = mongoose.model('GoodSpec', schema);
