let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema(
  {
    comment: { type: String, required: true },
    author: { type: String },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NewBook',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('V3Comment', commentSchema);
