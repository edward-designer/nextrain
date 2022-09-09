import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  test("display the input form", () => {
    render(<App />);
    const fromField = screen.getByLabelText("from");
    expect(fromField).toBeInTheDocument();
    const toField = screen.getByLabelText("to");
    expect(toField).toBeInTheDocument();
    const changeField = screen.queryByText("change");
    expect(changeField).not.toBeInTheDocument();
  });

  test("when nothing is entered, display 'Please begin by selecting the departure station.'", () => {
    render(<App />);

    const instruction = screen.getByText(
      "Please begin by selecting the departure station."
    );
    expect(instruction).toBeInTheDocument();
  });

  test("when the plus icon is clicked, the 'change' field is shown", async () => {
    render(<App />);
    const plusButton = screen.getByLabelText("Add a Change Station");
    userEvent.click(plusButton);
    const changeField = screen.getByLabelText("change");
    await waitFor(() => expect(changeField).toBeInTheDocument());
  });

  test("can switch to dark mode", async () => {
    render(<App />);
    const themeButton = screen.getByLabelText("toggle light and dark theme");
    userEvent.click(themeButton);
    const container = screen.getByTestId("wrapper");
    await waitFor(() =>
      expect(container).toHaveStyle("background-color:var(--background-main)")
    );
  });

  test("can search for journey with from station only", async () => {
    render(<App />);
    const fromField = screen.getByLabelText("from");
    await fireEvent.mouseDown(fromField);
    await userEvent.type(fromField, "THATCHAM");
    fireEvent.click(screen.getByText("Thatcham (THA)"));
    await waitFor(() => {
      const heading = screen.getByText("THA →");
      expect(heading).toBeInTheDocument();
    });
  });

  test("can search for journey with from and to stations", async () => {
    render(<App />);
    const fromField = screen.getByLabelText("from");
    await fireEvent.mouseDown(fromField);
    await userEvent.type(fromField, "THATCHAM");
    fireEvent.click(screen.getByText("Thatcham (THA)"));
    const toField = screen.getByLabelText("to");
    await fireEvent.mouseDown(toField);
    await userEvent.type(toField, "READING");
    fireEvent.click(screen.getByText("Reading (RDG)"));
    await waitFor(() => {
      const heading2 = screen.getByText("THA → RDG");
      expect(heading2).toBeInTheDocument();
    });
  });

  test("can reverse stations", async () => {
    render(<App />);
    const fromField = screen.getByLabelText("from");
    await fireEvent.mouseDown(fromField);
    await userEvent.type(fromField, "THATCHAM");
    fireEvent.click(screen.getByText("Thatcham (THA)"));
    const toField = screen.getByLabelText("to");
    await fireEvent.mouseDown(toField);
    await userEvent.type(toField, "READING");
    fireEvent.click(screen.getByText("Reading (RDG)"));

    const button = screen.getByLabelText("Swap Stations");
    await userEvent.click(button);
    await waitFor(() => {
      const heading3 = screen.getByText("RDG → THA");
      expect(heading3).toBeInTheDocument();
    });
  });
});
