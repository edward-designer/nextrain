const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./.env" });

app.use(cors());
app.use(express.json());

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

const settings = { method: "Get" };

app.get("/api/:from/to/:to/:timeOffset", (request, response) => {
  const timeOffset = request.params.timeOffset && 0;
  const to = request.params.to === "NIL" ? "" : `/to/${request.params.to}`;
  const URL = `https://huxley2.azurewebsites.net/departures/${request.params.from}${to}/20?accessToken=${process.env.ACCESSTOKEN}&expand=true&timeOffset=${timeOffset}&timeWindow=120`;
  fetch(URL, settings)
    .then((response) => response.json())
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
