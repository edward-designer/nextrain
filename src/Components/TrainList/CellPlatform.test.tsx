import { render, screen } from "@testing-library/react";

import CellPlatform from "./CellPlatform";

import { TrainStatus } from "../../Types/types";

describe("CellPlatform", () => {
  it("shows the platform number", () => {
    render(<CellPlatform platform="11" status={TrainStatus.ontime} />);
    expect(screen.getByText(11)).toBeInTheDocument();
  });
  
  it("does not show the platform number for cancelled trains", () => {
    render(<CellPlatform platform="11" status={TrainStatus.delayed} />);
    expect(screen.queryByText(11)).not.toBeInTheDocument();
  });
});
