const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const booksRoute = require('./routes/books');
const cartRoute = require('./routes/cart');

app.use('/api/books', booksRoute);
app.use('/api/cart', cartRoute);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
