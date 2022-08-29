import React, { useState, useEffect } from "react";

import { TFromTo } from "../Types/types";

type TUseStorageState = {
  fromTo: TFromTo;
  setFromTo: React.Dispatch<React.SetStateAction<TFromTo>>;
  canSwap: boolean;
  swapStations: () => void;
};
export default function useStateStorage(): TUseStorageState {
  const storedJourney = localStorage.getItem("journeyInfo");
  const value = storedJourney
    ? JSON.parse(storedJourney)
    : { from: "", to: "" };
  const [fromTo, setFromTo] = useState<TFromTo>(value);
  useEffect(() => {
    localStorage.setItem("journeyInfo", JSON.stringify(fromTo));
  }, [fromTo]);

  const canSwap = Boolean(fromTo.to && fromTo.from);
  const swapStations = () => {
    if (fromTo.to && fromTo.from) {
      const swapped = { from: fromTo.to, to: fromTo.from };
      setFromTo(swapped);
    }
  };
  return { fromTo, setFromTo, canSwap, swapStations };
}
