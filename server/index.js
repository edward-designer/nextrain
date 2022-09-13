const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

require("dotenv").config({ path: "./.env" });

app.use(express.json());

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const settings = { method: "Get" };

app.get("/api/:from/to/:to/:timeOffset", (request, response) => {
  const timeOffset = request.params.timeOffset || 0;
  const to = request.params.to === "NIL" ? "" : `/to/${request.params.to}`;
  const URL = `https://huxley2.azurewebsites.net/departures/${request.params.from}${to}/20?accessToken=${process.env.ACCESSTOKEN}&expand=true&timeOffset=${timeOffset}&timeWindow=120`;
  fetch(URL, settings)
    .then((response) => response.json())
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      console.error(err);
      response
        .status(400)
        .send(
          "Cannot get train information at the moment. Please try again later."
        );
    });
});

app.use(express.static("build"));
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "./build", "index.html"), (err) => {
    if (err) {
      console.log(err);
    }
  })
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
