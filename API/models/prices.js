"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var pricesSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  },
  price: Number,
  source: String,
}, {
  timestamps: true,
});

var Prices = mongoose.model('Prices', pricesSchema);
module.exports = Prices;
