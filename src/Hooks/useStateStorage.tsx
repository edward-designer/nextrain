import React, { useState, useEffect } from "react";

export default function useStateStorage<T>(): [
  T,
  React.Dispatch<React.SetStateAction<T>>
] {
  const storedJourney = localStorage.getItem("journeyInfo");
  const value = storedJourney
    ? JSON.parse(storedJourney)
    : { from: "", to: "" };
  const [fromTo, setFromTo] = useState<T>(value);
  useEffect(() => {
    localStorage.setItem("journeyInfo", JSON.stringify(fromTo));
  }, [fromTo]);
  return [fromTo, setFromTo];
}
