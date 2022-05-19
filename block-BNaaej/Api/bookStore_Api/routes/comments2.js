var express = require('express');
var router = express.Router();
var V2Book = require('../models/Book2');
var V2Comment = require('../models/Comment2');

// Updating A Comment
router.put('/updateComment/:commentId', (req, res, next) => {
  const commentId = req.params.commentId;
  const data = req.body;
  V2Comment.findByIdAndUpdate(commentId, data, (err, comment) => {
    if (err) return next(err);
    V2Book.findById(comment.bookId, (err, book) => {
      if (err) return next(err);
      res.status(200).json({ book });
    });
  });
});

// Deleting A  Comment
router.delete('/deleteComment/:commentId', (req, res, next) => {
  const commentId = req.params.commentId;
  V2Comment.findByIdAndDelete(commentId, (err, comment) => {
    if (err) return next(err);
    V2Book.findByIdAndUpdate(
      comment.bookId,
      { comments: { $pull: comment._id } },
      (err, book) => {
        if (err) return next(err);
        res.status(200).json({ book });
      }
    );
  });
});

module.exports = router;
