import React, { useState } from "react";

import SwapVertIcon from "@mui/icons-material/SwapVert";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import Autocomplete from "../Autocomplete";
import Button from "../Button";

import { TFromToArr, Label } from "../../Types/types";

type TProps = {
  fromToArr: TFromToArr;
  setFromToArr: React.Dispatch<React.SetStateAction<TFromToArr>>;
  canSwap: boolean;
  canAdd: boolean;
  swapStations: () => void;
};

const InputFormWrapper = ({
  fromToArr,
  setFromToArr,
  canSwap,
  canAdd = false,
  swapStations,
}: TProps) => {
  const start: [number, string] = [0, fromToArr[0] || ""];
  const destination: [number, string] =
    fromToArr.length >= 2
      ? [fromToArr.length - 1, fromToArr[fromToArr.length - 1]]
      : [2, ""];
  const interchange: [number, string] = [1, fromToArr[1] || ""];

  const [addStation, setAddStation] = useState(interchange[1] !== "");

  const addAStation = () => {
    setAddStation((addStation) => !addStation);
  };
  const closeAddStationField = () => {
    setAddStation(false);
    updateFromToArr(1, "");
  };

  const updateFromToArr = (order: number, value: string) => {
    setFromToArr((fromToArr) => {
      const newFromToArr = [...fromToArr];
      newFromToArr[order] = value;
      return newFromToArr;
    });
  };

  return (
    <div className="flex flex-col bg-background-form p-3 shadow-md shadow-text-notice">
      <Autocomplete
        label={Label.from}
        changeHandler={updateFromToArr}
        value={start}
      />
      <div
        className={`transition-all z-50 mt-2 ${addStation ? "h-20" : "h-0"} `}
      >
        {addStation ? (
          <div className="flex flex-row">
            <div className="flex-1 mt-1">
              <Autocomplete
                label={Label.change}
                changeHandler={updateFromToArr}
                value={interchange}
              />
            </div>
            <Button
              customStyle={`place-self-center ${
                !canAdd ? "bg-text-inactive cursor-default" : ""
              }`}
              clickHandler={closeAddStationField}
            >
              <CloseOutlinedIcon />
            </Button>
            <Button
              customStyle={`place-self-center ${
                !canSwap ? "bg-text-inactive cursor-default" : ""
              }`}
              clickHandler={swapStations}
            >
              <SwapVertIcon />
            </Button>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center -mt-6">
            <Button
              customStyle={`place-self-center ${
                !canAdd ? "bg-text-inactive cursor-default" : ""
              }`}
              clickHandler={addAStation}
            >
              <AddOutlinedIcon />
            </Button>
            <Button
              customStyle={`place-self-center ${
                !canSwap ? "bg-text-inactive cursor-default" : ""
              }`}
              clickHandler={swapStations}
            >
              <SwapVertIcon />
            </Button>
          </div>
        )}
      </div>
      <Autocomplete
        label={Label.to}
        changeHandler={updateFromToArr}
        value={destination}
      />
    </div>
  );
};

export default InputFormWrapper;