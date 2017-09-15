require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
const cloudinary = require("../utils/cloudinary.js");
const visionHelper = require("../utils/aiHelper");

const app = express();
var PORT = process.env.PORT || 1225;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use("/public", express.static(path.join(__dirname, "../../public/")));

app.get("/data", function(req, res) {
  res.download(path.join(__dirname, "../../public/grandcanyonvsyosemite.zip"));
});

app.post("/pics", function(req, res) {
  var imageURL = req.body.url;

  visionHelper(imageURL)
    .then(function(body) {
      var labelTemplate = {
        grandcanyon: "grandcanyon_template_horizontal_uhntmk",
        yosemite: "yosemitetemp_horiz_a9y1mx"
      };

      var probs = JSON.parse(body).probabilities;
      var highestProb = Number.NEGATIVE_INFINITY;
      var highestProbLabel = undefined;

      for (var i = 0; i < probs.length; i++) {
        if (probs[i].probability < 0 || probs[i].probability > 1) {
          continue;
        } else {
          if (
            Math.max(highestProb, probs[i].probability) === probs[i].probability
          ) {
            highestProb = probs[i].probability;
            highestProbLabel = probs[i].label;
          }
        }
      }

      if (highestProbLabel === undefined) {
        res
          .status(200)
          .send({ success: false, message: "Unable to identify location." });
      } else {
        cloudinary.v2.uploader.upload(
          imageURL,
          {
            width: 2000,
            height: 1000,
            crop: "limit",
            underlay: labelTemplate[highestProbLabel]
          },
          function(error, result) {
            if (error) {
              res
                .status(500)
                .send({ success: false, message: "Unable to create card" });
            } else {
              res.status(200).send({ success: true, url: result.url });
            }
          }
        );
      }
    })
    .catch(function(err) {
      res
        .status(500)
        .send({ success: false, message: "Request to vision api failed" });
    });
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
