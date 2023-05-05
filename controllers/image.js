require("dotenv").config();

const PAT = process.env.PAT;
const USER_ID = process.env.USER_ID;
const APP_ID = process.env.APP_ID;

const MODEL_ID = process.env.MODEL_ID;
const MODEL_VERSION_ID = process.env.MODEL_VERSION_ID;

const raw = (image_url) => {
  return JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: image_url,
          },
        },
      },
    ],
  });
};

const requestOptions = (image_url) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw(image_url),
  };
};

const handleApiCall = (req, res) => {
  fetch(
    "https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs",
    requestOptions(req.body.input)
  )
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("unable to work with API");
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
