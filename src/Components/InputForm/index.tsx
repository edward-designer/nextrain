import React from "react";

import SwapVertIcon from "@mui/icons-material/SwapVert";

import Autocomplete from "../Autocomplete";
import Button from "../Button";

import { TFromTo, Label } from "../../Types/types";

type TProps = {
  fromTo: TFromTo;
  setFromTo: React.Dispatch<React.SetStateAction<TFromTo>>;
  canSwap: boolean;
  swapStations: () => void;
};

const InputForm = ({ fromTo, setFromTo, canSwap, swapStations }: TProps) => {
  return (
    <div className="flex flex-col bg-background-form p-3 shadow-md shadow-text-notice">
      <Autocomplete
        label={Label.from}
        changeHandler={setFromTo}
        value={fromTo}
      />
      <div className="flex flex-row items-center justify-center my-[-30px] z-50">
        <Button
          customStyle={`place-self-center ${
            !canSwap ? "bg-text-inactive cursor-default" : ""
          }`}
          clickHandler={swapStations}
        >
          <SwapVertIcon />
        </Button>
      </div>
      <Autocomplete label={Label.to} changeHandler={setFromTo} value={fromTo} />
    </div>
  );
};

export default InputForm;
