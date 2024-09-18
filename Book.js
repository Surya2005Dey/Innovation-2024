const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  available: Boolean,
});

module.exports = mongoose.model('Book', BookSchema);
