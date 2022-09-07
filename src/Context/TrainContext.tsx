import React, { createContext, useState } from "react";

type TTrainContext = {
  children: React.ReactNode;
};

type TInitialTrainContextValue = {
  toTime: string;
  setToTime: React.Dispatch<React.SetStateAction<string>>;
  toStation: string;
  setToStation: React.Dispatch<React.SetStateAction<string>>;
};

const initialTrainContextValue = {
  toTime: "",
  setToTime: () => {},
  toStation: "",
  setToStation: () => {},
};
export const SelectedTrainContext = createContext<TInitialTrainContextValue>(
  initialTrainContextValue
);

const TrainContext = ({ children }: TTrainContext) => {
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
