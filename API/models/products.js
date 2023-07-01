"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
  title: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories'
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Items'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  imageUrl: String,
  desc: String,
}, {
  timestamps: true,
});

productSchema.index({ title: 'text' });
var Posts = mongoose.model('Products', productSchema);
module.exports = Posts;
