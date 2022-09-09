import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useTrainInfo from "../../Hooks/useTrainInfo";

import TrainList from "./index";

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

const mockRefetch = jest.fn();

jest.mock("../../Hooks/useTrainInfo", () => ({
  __esModule: true,
  default: () => ({
    response: [
      {
        serviceIdUrlSafe: "yLrHn4b3njN-hDJ47qPl6A",
        endStation: "London Paddington",
        endStationCRS: "PAD",
        isRunning: false,
        status: "Delayed",
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
        arrivalTimeDestination: "16:49",
        reason:
          "This train has been delayed by trespassers on the railway earlier today",
      },
      {
        serviceIdUrlSafe: "jYoGmVdcCE3WiszhG61Svg",
        endStation: "London Paddington",
        endStationCRS: "PAD",
        isRunning: false,
        status: "Delayed",
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
        arrivalTimeDestination: "17:52",
        reason:
          "This train has been delayed by trespassers on the railway earlier today",
      },
    ],
    error: "",
    loading: false,
    refetch: mockRefetch,
  }),
}));

describe("TrainList", () => {
  it("render the heading correctly", async () => {
    render(<TrainList fromTo={{ from: "THA", to: "PAD" }} direct={false} />);
    expect(screen.getByText("THA → PAD")).toBeInTheDocument();

    const button = screen.getByLabelText("update train data");
    await userEvent.click(button);
    expect(mockRefetch).toHaveBeenCalledTimes(2);
    await userEvent.click(button);
    expect(mockRefetch).toHaveBeenCalledTimes(3);
  });
});
