import React from "react";
import ReactDOM from "react-dom/client";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

import "./index.css";
import App from "./App";

TimeAgo.addDefaultLocale(en);

const customLabels = {
  year: "{0}yr",
  month: "{0}mo",
  week: "{0}wk",
  day: "{0}d",
  hour: "{0}h",
  minute: "{0}m",
  second: "{0}s",
  now: {
    current: "due",
    future: "due",
    past: "due",
  },
};
TimeAgo.addLabels("en", "custom", customLabels);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
