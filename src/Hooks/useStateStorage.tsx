import React, { useState, useEffect } from "react";

import { TFromToArr, Theme } from "../Types/types";

type TUseStorageState = {
  fromToArr: TFromToArr;
  setFromToArr: React.Dispatch<React.SetStateAction<TFromToArr>>;
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  canSwap: boolean;
  swapStations: () => void;
  canAdd: boolean;
};

export default function useStateStorage(): TUseStorageState {
  const storedJourney = localStorage.getItem("NextTrainJourneyInfo");
  const storedTheme = localStorage.getItem("NextTrainTheme");
  const value = storedJourney ? JSON.parse(storedJourney) : ["", "", ""];
  const themeValue = storedTheme === "dark" ? "dark" : "light";

  const [fromToArr, setFromToArr] = useState<TFromToArr>(value);
  const [theme, setTheme] = useState<Theme>(themeValue);

  useEffect(() => {
    localStorage.setItem("NextTrainJourneyInfo", JSON.stringify(fromToArr));
  }, [fromToArr]);

  useEffect(() => {
    localStorage.setItem("NextTrainTheme", theme);
  }, [theme]);

  const canSwap = fromToArr.filter(Boolean).length >= 2;
  const canAdd = fromToArr.filter(Boolean).length >= 2;

  const swapStations = () => {
    if (canSwap) {
      const swapped = [...fromToArr].reverse();
      setFromToArr(swapped);
    }
  };
  
  return {
    fromToArr,
    setFromToArr,
    canSwap,
    swapStations,
    canAdd,
    theme,
    setTheme,
  };
}
