import { screen, render } from "@testing-library/react";

import TrainListContainer from "./TrainListContainer";

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

const response = [
  {
    serviceIdUrlSafe: "yLrHn4b3njN-hDJ47qPl6A",
    endStation: "London Paddington",
    endStationCRS: "PAD",
    isRunning: false,
    status: TrainStatus.delayed,
    std: "16:01",
    platform: "2",
    callingPoint: [
      {
        locationName: "Theale",
        crs: "THE",
        st: "16:08",
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
        st: "16:22",
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
        st: "16:49",
        et: "On time",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
    ],
    arrivalTime: "16:01",
    arrivalTimeDestination: "16:22",
    reason:
      "This train has been delayed by trespassers on the railway earlier today",
    hasToilet: false,
    fastest: false,
  },
  {
    serviceIdUrlSafe: "72stsRmf7zyY8XO0Whv1wA",
    endStation: "Reading",
    endStationCRS: "RDG",
    isRunning: true,
    status: TrainStatus.ontime,
    std: "16:10",
    platform: "2",
    callingPoint: [
      {
        locationName: "Midgham",
        crs: "MDG",
        st: "16:14",
        et: "On time",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Aldermaston",
        crs: "AMT",
        st: "16:17",
        et: "On time",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Theale",
        crs: "THE",
        st: "16:22",
        et: "On time",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Reading West",
        crs: "RDW",
        st: "16:28",
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
        st: "16:32",
        et: "On time",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
    ],
    arrivalTime: "16:10",
    arrivalTimeDestination: "16:32",
    reason: null,
    hasToilet: false,
    fastest: false,
  },
  {
    serviceIdUrlSafe: "u6zHFRqGor7ZHwEt8KyQNA",
    endStation: "Reading",
    endStationCRS: "RDG",
    isRunning: true,
    status: TrainStatus.ontime,
    std: "16:39",
    platform: "2",
    callingPoint: [
      {
        locationName: "Theale",
        crs: "THE",
        st: "16:46",
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
        st: "16:55",
        et: "On time",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
    ],
    arrivalTime: "16:39",
    arrivalTimeDestination: "16:55",
    reason: null,
    hasToilet: false,
    fastest: false,
  },
  {
    serviceIdUrlSafe: "jYoGmVdcCE3WiszhG61Svg",
    endStation: "London Paddington",
    endStationCRS: "PAD",
    isRunning: false,
    status: TrainStatus.delayed,
    std: "17:03",
    platform: "2",
    callingPoint: [
      {
        locationName: "Theale",
        crs: "THE",
        st: "17:10",
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
        st: "17:22",
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
        st: "17:52",
        et: "On time",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
    ],
    arrivalTime: "17:03",
    arrivalTimeDestination: "17:22",
    reason:
      "This train has been delayed by trespassers on the railway earlier today",
    hasToilet: true,
    fastest: false,
  },
  {
    serviceIdUrlSafe: "abk_MHVSgdYNfr6usBrCvw",
    endStation: "Reading",
    endStationCRS: "RDG",
    isRunning: true,
    status: TrainStatus.ontime,
    std: "17:12",
    platform: "2",
    callingPoint: [
      {
        locationName: "Midgham",
        crs: "MDG",
        st: "17:16",
        et: "On time",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Aldermaston",
        crs: "AMT",
        st: "17:19",
        et: "On time",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Theale",
        crs: "THE",
        st: "17:24",
        et: "On time",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
      {
        locationName: "Reading West",
        crs: "RDW",
        st: "17:30",
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
        st: "17:34",
        et: "On time",
        at: null,
        isCancelled: false,
        length: 0,
        detachFront: false,
        formation: null,
        adhocAlerts: null,
      },
    ],
    arrivalTime: "17:12",
    arrivalTimeDestination: "17:34",
    reason: null,
    hasToilet: false,
    fastest: false,
  },
];
const fromTo = { from: "THA", to: "PAD" };
describe("TrainListContainer", () => {
  it("should render a list of trains", () => {
    render(<TrainListContainer fromTo={fromTo} response={response} />);
    expect(screen.getAllByText("Delayed")[0]).toBeInTheDocument();
    expect(screen.getAllByText("→ Reading")[0]).toBeInTheDocument();
    expect(screen.getByText("17:12")).toBeInTheDocument();
    expect(
      screen.getAllByText(
        "This train has been delayed by trespassers on the railway earlier today"
      )[0]
    ).toBeInTheDocument();
  });
  it("gives a message when no trains are found", () => {
    render(<TrainListContainer fromTo={fromTo} response={[]} />);
    expect(
      screen.getByText(
        "Sorry, no trains are found currently. Check back later to look for available trains."
      )
    ).toBeInTheDocument();
  });
  it("gives a message when there is no from station", () => {
    render(<TrainListContainer fromTo={{ from: "", to: "" }} response={[]} />);
    expect(
      screen.getByText(
        "Please begin by entering the departure station in the 'from' field above."
      )
    ).toBeInTheDocument();
  });
});
