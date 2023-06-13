"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories'
  },
  desc: String,
}, {
  timestamps: true,
});

itemsSchema.index({ name: 'text' });
var Items = mongoose.model('Items', itemsSchema);
module.exports = Items;
