import { screen, render } from "@testing-library/react";

import CellCountDown from "./CellCountDown";

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

describe("CellChangeTimer", () => {
  it("shows the countdown timer", async () => {
    const departureDateObj = new Date();
    departureDateObj.setHours(departureDateObj.getHours() + 1);
    const isRunning = true;
    render(
      <CellCountDown
        departureDateObj={departureDateObj}
        isRunning={isRunning}
      />
    );
    const countDown = screen.getByText("1h");
    expect(countDown).toBeInTheDocument();

    const countDown1 = screen.queryByTestId("ping");
    expect(countDown1).toBeInTheDocument();

    jest.useFakeTimers();
    const fakeTime = new Date();
    fakeTime.setMinutes(fakeTime.getMinutes() + 2);
    jest.setSystemTime(fakeTime);
    render(
      <CellCountDown
        departureDateObj={departureDateObj}
        isRunning={isRunning}
      />
    );
    const countDown2 = screen.getByText("58m");
    expect(countDown2).toBeInTheDocument();
 
    // shows due when time is up
    jest.useFakeTimers();
    const fakeTime2 = new Date();
    fakeTime2.setHours(fakeTime2.getHours() + 1);
    jest.setSystemTime(fakeTime2);
    render(
      <CellCountDown
        departureDateObj={departureDateObj}
        isRunning={isRunning}
      />
    );
    const countDown3 = screen.getByText("due");
    expect(countDown3).toBeInTheDocument();
  });
  it("does not show the countdown timer for trains not running", async () => {
    const departureDateObj = undefined;
    const isRunning = false;
    render(
      <CellCountDown
        departureDateObj={departureDateObj}
        isRunning={isRunning}
      />
    );
    const countDown = screen.queryByTestId("ping");
    expect(countDown).not.toBeInTheDocument();
  });
});
