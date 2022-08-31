import React, { useState, useEffect } from "react";

import { TFromToArr } from "../Types/types";

type TUseStorageState = {
  fromToArr: TFromToArr;
  setFromToArr: React.Dispatch<React.SetStateAction<TFromToArr>>;
  canSwap: boolean;
  swapStations: () => void;
  canAdd: boolean;
};

export default function useStateStorage(): TUseStorageState {
  const storedJourney = localStorage.getItem("journeyInfo");
  const value = storedJourney ? JSON.parse(storedJourney) : ["", "", ""];

  const [fromToArr, setFromToArr] = useState<TFromToArr>(value);

  useEffect(() => {
    localStorage.setItem("journeyInfo", JSON.stringify(fromToArr));
  }, [fromToArr]);

  const canSwap = fromToArr.filter(Boolean).length >= 2;
  const canAdd = fromToArr.filter(Boolean).length >= 2;

  const swapStations = () => {
    if (canSwap) {
      const swapped = [...fromToArr].reverse();
      setFromToArr(swapped);
    }
  };
  return { fromToArr, setFromToArr, canSwap, swapStations, canAdd };
}
