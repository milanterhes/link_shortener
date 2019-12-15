const randomBytes = require("crypto").randomBytes;
const UrlEntry = require("../db").UrlEntry;

async function createEntry(req, res) {
  let url = req.body.url;
  if (url.substring(0, 3) != "http") {
    url = "https://" + url;
  }
  let shortForm = randomBytes(8).toString("hex");
  try {
    await UrlEntry.find({ $or: [{ shortForm }, { longForm: url }] }, function(
      err,
      docs
    ) {
      if (docs.length == 0) {
        let newEntry = new UrlEntry();
        newEntry.longForm = url;
        newEntry.shortForm = shortForm;
        newEntry.save();
        return res.send({
          shortForm: newEntry.shortForm,
          url: newEntry.longForm
        });
      } else {
        return res.send({
          shortForm: docs[0].shortForm,
          url: docs[0].longForm
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = createEntry;
