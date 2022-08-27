import React, { useState, useEffect } from "react";

import { TFromToType } from "../Types/types";

export default function useStateStorage(): [
  TFromToType,
  React.Dispatch<React.SetStateAction<TFromToType>>,
  () => void
] {
  const storedJourney = localStorage.getItem("journeyInfo");
  const value = storedJourney
    ? JSON.parse(storedJourney)
    : { from: "", to: "" };
  const [fromTo, setFromTo] = useState<TFromToType>(value);
  useEffect(() => {
    localStorage.setItem("journeyInfo", JSON.stringify(fromTo));
  }, [fromTo]);

  const swapStations = () => {
    const swapped = { from: fromTo.to, to: fromTo.from };
    setFromTo(swapped);
  };
  return [fromTo, setFromTo, swapStations];
}
