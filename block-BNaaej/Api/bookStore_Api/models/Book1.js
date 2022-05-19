let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    author: { type: String, required: true },
    tags: [{ type: String }],
    pages: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('V1Book', bookSchema);
