const request = require("request-promise");

function visionHelper(imageURL) {
  var options = {
    method: "POST",
    url: "https://api.einstein.ai/v2/vision/predict",
    headers: {
      "content-type":
        "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      "cache-control": "no-cache",
      authorization: "Bearer " + process.env.VISION_TOKEN
    },
    formData: {
      sampleLocation: imageURL,
      modelId: process.env.MODEL_ID
    }
  };

  return request(options);
}

module.exports = visionHelper;
