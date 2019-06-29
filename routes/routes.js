var express = require("express");
var axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
var router = express.Router();

router.get("/", function(req, res) {
  console.log("inside get '/'");
  db.Article.find({}, {}, function(error, docs) {
    res.render("index", { articles: docs });
  });
});

router.get("/empty", function(req, res) {
  db.Article.remove({}).then(function() {
    res.redirect("/");
  });
});

router.get("/fetch", function(req, res) {
  console.log("inside get '/fetch'");
  axios.get("https://techcrunch.com/").then(function(response) {
    var $ = cheerio.load(response.data);
    $(".post-block").each(function(i, element) {
      var result = {};
      result.headline = $(this)
        .children("header")
        .children("h2")
        .children("a")
        .text();

      result.summary = $(this)
        .children("div")
        .text();

      result.url = $(this)
        .children("header")
        .children("h2")
        .children("a")
        .attr("href");
      db.Article.create(result);
    });
    res.redirect("/");
  });
});

router.get("/saved", function(req, res) {
  db.Snippet.find({}, {}, function(error, docs) {
    res.render("savedArticles", { snippets: docs });
  });
});

router.post("/saved", function(req, res) {
  db.Article.findOne({ _id: req.body.id }, function(error, docs) {
    var result = {};
    result.headline = docs.headline;
    result.url = docs.url;
    result.summary = docs.summary;
    result.comments = "";
    db.Snippet.create(result).then(function() {
      res.redirect("/");
    });
  });
});

router.put("/saved", function(req, res) {
  console.log("req.body.comments: " + req.body.comments);
  console.log("req.body.id: " + req.body.id);
  db.Snippet.updateMany(
    { _id: req.body.id },
    { $set: { "comments": req.body.comments }}
  ).then(function() {
    console.log("comment updated");
  });
});

router.delete("/saved", function(req, res) {
    console.log("delete id: " + req.body.id);
  db.Snippet.deleteOne({ _id: req.body.id }).then(function() {
    res.redirect("/saved");
  });
});

module.exports = router;
