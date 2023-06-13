"use strict"
var mongoose = require('mongoose');

var categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: String,
  imageUrl: String,
}, {
  timestamps: true
});

var CategoriesSchema = mongoose.model('Categories', categoriesSchema);
module.exports = CategoriesSchema;
