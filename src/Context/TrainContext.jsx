import React, { createContext, useState } from "react";

export const TrainScheduleContext = createContext();

const TrainContext = ({ children }) => {
  const [time, setTime] = useState("");
  const [toStation, setToStation] = useState("");
  return (
    <TrainScheduleContext.Provider
      value={{ time, setTime, toStation, setToStation }}
    >
      {children}
    </TrainScheduleContext.Provider>
  );
};

export default TrainContext;
