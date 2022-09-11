import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TrainRowContainer from "./TrainRowContainer";

import { TrainStatus } from "../../Types/types";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
// Set locale for TimeAgo
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

const fromTo = { from: "THA", to: "PAD" };
const trainDetails = {
  serviceIdUrlSafe: "os3NJfhdwBKkNqDHIsVQCQ",
  endStation: "London Paddington",
  endStationCRS: "PAD",
  isRunning: true,
  status: TrainStatus.ontime,
  std: "13:05",
  platform: "2",
  callingPoint: [
    {
      locationName: "Theale",
      crs: "THE",
      st: "13:12",
      et: "On time",
      at: null,
      isCancelled: false,
      length: 0,
      detachFront: false,
      formation: null,
      adhocAlerts: null,
    },
    {
      locationName: "Reading",
      crs: "RDG",
      st: "13:24",
      et: "On time",
      at: null,
      isCancelled: false,
      length: 0,
      detachFront: false,
      formation: null,
      adhocAlerts: null,
    },
    {
      locationName: "London Paddington",
      crs: "PAD",
      st: "13:56",
      et: "On time",
      at: null,
      isCancelled: false,
      length: 0,
      detachFront: false,
      formation: null,
      adhocAlerts: null,
    },
  ],
  arrivalTime: "13:05",
  arrivalTimeDestination: "13:56",
  reason: "This is the reason",
  hasToilet: true,
  fastest: false,
  isDirect: false,
};
const rowSelected = false;
const setRowSelected = jest.fn();

describe("TrainRowContainer", () => {
  it("shows the train info correctly", async () => {
    render(
      <TrainRowContainer
        fromTo={fromTo}
        trainDetails={trainDetails}
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
      />
    );
    expect(screen.getByText("→ London Paddington")).toBeInTheDocument();
    expect(screen.getByText("London Paddington (13:56)")).toBeInTheDocument();
    expect(screen.getByText("13:05")).toBeInTheDocument();
    expect(screen.getByText("→ 13:56")).toBeInTheDocument();
    expect(screen.getByText("Platform")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("This is the reason")).toBeInTheDocument();

    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(setRowSelected).toHaveBeenCalledTimes(2);
  });
});
