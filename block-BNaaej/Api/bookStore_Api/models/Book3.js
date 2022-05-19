let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    author: { type: String, required: true },
    tags: [{ type: String }],
    pages: { type: Number },
    categories: [{ type: String }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'V1Comment' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('V3Book', bookSchema);
