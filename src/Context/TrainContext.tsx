import React, { createContext, useState } from "react";

type TTrainContext = {
  children: React.ReactNode;
};

type TInitialTrainContextValue = {
  fromTime: string;
  setFromTime: React.Dispatch<React.SetStateAction<string>>;
  toTime: string;
  setToTime: React.Dispatch<React.SetStateAction<string>>;
  toStation: string;
  setToStation: React.Dispatch<React.SetStateAction<string>>;
  trainId: string;
  setTrainId: React.Dispatch<React.SetStateAction<string>>;
  reset: () => void;
};

const initialTrainContextValue = {
  fromTime: "",
  setFromTime: () => {},
  toTime: "",
  setToTime: () => {},
  toStation: "",
  setToStation: () => {},
  trainId: "",
  setTrainId: () => {},
  reset: () => {},
};
export const SelectedTrainContext = createContext<TInitialTrainContextValue>(
  initialTrainContextValue
);

const TrainContext = ({ children }: TTrainContext) => {
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [toStation, setToStation] = useState("");
  const [trainId, setTrainId] = useState("");

  const reset = () => {
    setFromTime("");
    setToTime("");
    setToStation("");
    setTrainId("");
  };
  return (
    <SelectedTrainContext.Provider
      value={{
        fromTime,
        setFromTime,
        toTime,
        setToTime,
        toStation,
        setToStation,
        trainId,
        setTrainId,
        reset,
      }}
    >
      {children}
    </SelectedTrainContext.Provider>
  );
};

export default TrainContext;
