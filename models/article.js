var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var scrapedArticle = new Schema({
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
});

var Article = mongoose.model("Article", scrapedArticle);

module.exports = Article;