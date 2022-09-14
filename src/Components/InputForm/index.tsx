import React, { useState, useContext } from "react";

import SwapVertIcon from "@mui/icons-material/SwapVert";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { SelectedTrainContext } from "../../Context/TrainContext";

import Autocomplete from "../Autocomplete";
import Button from "../Common/Button";
import FavControl from "./FavControl";

import { TFromToArr, Label } from "../../Types/types";

type TProps = {
  fromToArr: TFromToArr;
  setFromToArr: React.Dispatch<React.SetStateAction<TFromToArr>>;
  canSwap: boolean;
  canAdd: boolean;
  swapStations: () => void;
};

const convertToValueArr = (fromToArr: TFromToArr) => {
  const start: [number, string] = [0, fromToArr[0] || ""];
  const destination: [number, string] =
    fromToArr.length >= 2
      ? [fromToArr.length - 1, fromToArr[fromToArr.length - 1]]
      : [2, ""];
  const interchange: [number, string] = [1, fromToArr[1] || ""];
  return { start, interchange, destination };
};

const InputFormWrapper = ({
  fromToArr,
  setFromToArr,
  canSwap,
  canAdd = false,
  swapStations,
}: TProps) => {
  const { start, interchange, destination } = convertToValueArr(fromToArr);
  const { reset } = useContext(SelectedTrainContext);
  const [addStation, setAddStation] = useState(interchange[1] !== "");

  const addAStation = () => {
    setAddStation((addStation) => !addStation);
  };
  const closeAddStationField = () => {
    setAddStation(false);
    updateFromToArr(1, "");
  };
  const swapHandler = () => {
    swapStations();
    reset();
  };

  const updateFromToArr = (order: number, value: string) => {
    setFromToArr((fromToArr) => {
      const newFromToArr = [...fromToArr];
      newFromToArr[order] = value;
      return newFromToArr;
    });
  };

  return (
    <div className="flex flex-row flex-wrap bg-background-form pr-0 shadow-md">
      <div className="flex-1 flex flex-col p-3 shadow-black md:flex-row md:items-center md:gap-2">
        <div className="flex-1">
          <Autocomplete
            label={Label.from}
            changeHandler={updateFromToArr}
            value={start}
          />
        </div>
        <div
          className={` md:flex-1 transition-all z-50 mt-2 ${
            addStation ? "h-20" : "h-0"
          } `}
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
                ariaLabel="Add a Change Station"
              >
                <CloseOutlinedIcon />
              </Button>
              <Button
                customStyle={`place-self-center md:rotate-90 ${
                  !canSwap ? "bg-text-inactive cursor-default" : ""
                }`}
                clickHandler={swapHandler}
                ariaLabel="Swap Stations"
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
                ariaLabel="Add a Change Station"
              >
                <AddOutlinedIcon />
              </Button>
              <Button
                customStyle={`place-self-center  md:rotate-90 ${
                  !canSwap ? "bg-text-inactive cursor-default" : ""
                }`}
                clickHandler={swapHandler}
                ariaLabel="Swap Stations"
              >
                <SwapVertIcon />
              </Button>
            </div>
          )}
        </div>
        <div className="flex-1">
          <Autocomplete
            label={Label.to}
            changeHandler={updateFromToArr}
            value={destination}
          />
        </div>
      </div>
      <FavControl fromToArr={fromToArr} setFromToArr={setFromToArr} />
    </div>
  );
};

export default InputFormWrapper;
