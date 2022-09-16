import { screen, render } from "@testing-library/react";

import CellDestination from "./CellDestination";

import { TrainStatus } from "../../Types/types";

const destination = "London Paddington";
const subsequentCallingPoints = [
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
];
const fromTo = { from: "THA", to: "PAD" };
const finalDestination = "PAD";
const destinationPlatform = "1";
describe("CellDestination", () => {
  it("should display the destination as well as all stations for non-cancelled trains", () => {
    const status = TrainStatus.ontime;
    render(
      <CellDestination
        destination={destination}
        subsequentCallingPoints={subsequentCallingPoints}
        fromTo={fromTo}
        status={status}
        finalDestination={finalDestination}
        destinationPlatform={destinationPlatform}
        isSelected={true}
        isDirect={false}
      />
    );
    const displayDestination = screen.getByText("London Paddington");
    expect(displayDestination).toBeInTheDocument();

    const displayDestinationWithTime = screen.getByText(
      "London Paddington (13:56)"
    );
    expect(displayDestinationWithTime).toBeInTheDocument();
  });

  it("should only display the destination for cancelled trains", () => {
    const status = TrainStatus.cancelled;
    render(
      <CellDestination
        destination={destination}
        subsequentCallingPoints={subsequentCallingPoints}
        fromTo={fromTo}
        status={status}
        finalDestination={finalDestination}
        destinationPlatform={destinationPlatform}
        isSelected={true}
        isDirect={false}
      />
    );
    const displayDestination = screen.getByText("London Paddington");
    expect(displayDestination).toBeInTheDocument();

    const displayDestinationWithTime = screen.queryByText(
      "London Paddington (13:56)"
    );
    expect(displayDestinationWithTime).not.toBeInTheDocument();
  });
});
