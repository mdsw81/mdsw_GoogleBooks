const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const googlebooks = new Schema({
  authors: { type: [String] },
  description: { type: String },
  image: { type: String },
  link: { type: String },
  title: { type: String, required: true }
});

const Book = mongoose.model("Book", googlebooks);

module.exports = Book;
