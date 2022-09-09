import { screen, render } from "@testing-library/react";

import CellChangeTimer from "./CellChangeTimer";

describe("CellChangeTimer", () => {
  it("shows the transfer time", () => {
    render(<CellChangeTimer changeTime={"3m"} />);
    const transferTime = screen.getByText("3m");
    expect(transferTime).toBeInTheDocument();
  });
});
