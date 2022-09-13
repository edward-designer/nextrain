import { screen, render } from "@testing-library/react";

import CellTime from "./CellTime";

import { TrainStatus } from "../../Types/types";

describe("CellTime", () => {
  it("should show the departure and arrival time", () => {
    render(
      <CellTime
        std="19:40"
        arrivalTime="19:50"
        arrivalTimeDestination="20:00"
        arrivalTimeFinalDestination=""
        status={TrainStatus.ontime}
      />
    );
    expect(screen.getByText("19:40")).toBeInTheDocument();
    expect(screen.getByText("19:50")).toBeInTheDocument();
    expect(screen.getByText("→ 20:00")).toBeInTheDocument();
  });
  it("shows delayed for delayed trains", () => {
    render(
      <CellTime
        std="19:40"
        arrivalTime="19:50"
        arrivalTimeDestination="20:00"
        arrivalTimeFinalDestination=""
        status={TrainStatus.delayed}
      />
    );
    expect(screen.getByText("19:40")).toBeInTheDocument();
    expect(screen.getByText("Delayed")).toBeInTheDocument();
    expect(screen.queryByText("19:50")).not.toBeInTheDocument();
  });
});
