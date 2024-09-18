const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

let cart = [];

// Add a book to the cart
router.post('/', (req, res) => {
  const { bookId } = req.body;
  Book.findById(bookId)
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      cart.push(book);
      res.json({ message: 'Book added to cart', cart });
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

// Get cart items
router.get('/', (req, res) => {
  res.json(cart);
});

// Remove book from cart
router.delete('/:id', (req, res) => {
  cart = cart.filter(book => book._id.toString() !== req.params.id);
  res.json({ message: 'Book removed from cart', cart });
});

module.exports = router;
