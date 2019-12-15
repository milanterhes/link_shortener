const UrlEntry = require("../db").UrlEntry;

function redirect(req, res) {
  const shortForm = req.path.substring(1);
  UrlEntry.find({ shortForm }, function(err, docs) {
    if (docs.length > 0) res.status(302).redirect(docs[0].longForm);
    else res.status(302).redirect("/");
  });
}

module.exports = redirect;
