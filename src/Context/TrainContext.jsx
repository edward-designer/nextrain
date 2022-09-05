import React, { createContext, useState } from "react";

export const SelectedTrainContext = createContext();

const TrainContext = ({ children }) => {
  const [toTime, setToTime] = useState("");
  const [toStation, setToStation] = useState("");
  return (
    <SelectedTrainContext.Provider
      value={{ toTime, setToTime, toStation, setToStation }}
    >
      {children}
    </SelectedTrainContext.Provider>
  );
};

export default TrainContext;
