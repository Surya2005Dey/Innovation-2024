const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Filter books by genre or author
router.get('/filter', async (req, res) => {
  const { author, genre } = req.query;
  try {
    const books = await Book.find({
      ...(author && { author }),
      ...(genre && { genre })
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
