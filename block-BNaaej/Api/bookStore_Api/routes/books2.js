var express = require('express');
var router = express.Router();
var V2Book = require('../models/Book2');
var V2Comment = require('../models/Comment2');

// Get all books
router.get('/', (req, res, next) => {
  V2Book.find({}, (err, books) => {
    if (err) return next(err);
    res.status(200).json({ books });
  });
});

// Get single book
router.get('/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;
  V2Book.findById(bookId, (err, book) => {
    if (err) return next(err);
    res.status(200).json({ book });
  });
});

// Create a book
router.post('/', (req, res, next) => {
  const data = req.body;
  V2Book.create(data, (err, book) => {
    if (err) return next(err);
    res.status(200).json({ book });
  });
});

// Update a book
router.put('/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;
  const data = req.body;
  V2Book.findByIdAndUpdate(bookId, data, (err, book) => {
    if (err) return next(err);
    res.status(200).json({ book });
  });
});

// Delete a book
router.delete('/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;
  V2Book.findByIdAndDelete(bookId, (err, book) => {
    if (err) return next(err);
    res.status(200).json({ book });
  });
});

// Adding A  Comment
router.post('/addComment/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;
  const data = req.body;
  data.bookId = bookId;
  V2Comment.create(data, (err, comment) => {
    if (err) return next(err);
    V2Book.findByIdAndUpdate(
      bookId,
      { comments: { $push: comment._id } },
      (err, book) => {
        if (err) return next(err);
        res.status(200).json({ book });
      }
    );
  });
});

// Doubt
// Listing Comments of A Book
router.get('/commentList/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;
  var commentsArray = [];
  V2Book.aggregate(
    [
      { $match: { id: bookId } },
      {
        $project: {
          comments: '$comments',
        },
      },
    ],
    (err, comments) => {
      if (err) return next(err);
      comments.forEach((elem) => {
        V1Comment.findById(elem, (err, comment) => {
          if (err) return next(err);
          commentsArray.push(comment);
        });
      });
      res.status(200).json({ commentsArray });
    }
  );
});

module.exports = router;
