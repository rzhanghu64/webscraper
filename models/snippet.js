var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var savedArticle = new Schema({
  headline: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: false
  }
});

var Snippet = mongoose.model("Snippet", savedArticle);

module.exports = Snippet;