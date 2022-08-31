import React from "react";

import AutocompleteField from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import useTrainStationsList from "../../Hooks/useTrainStationsList";

import { Label } from "../../Types/types";

type TAutocompleteProps = {
  label: Label;
  changeHandler: (order: number, value: string) => void;
  value: [number, string];
};

const Autocomplete = ({ label, changeHandler, value }: TAutocompleteProps) => {
  const [stationList] = useTrainStationsList();

  return (
    <div className="my-4">
      <AutocompleteField
        id={label}
        options={stationList}
        autoHighlight
        getOptionLabel={(station) =>
          station && `${station.stationName} (${station.crsCode})`
        }
        value={
          stationList.filter((station) => station.crsCode === value[1])[0] ||
          null
        }
        onChange={(_, newStation) => {
          const updateValue = newStation?.crsCode || "";
          changeHandler(value[0], updateValue);
        }}
        renderInput={(params) => (
          <TextField
            sx={{
              "& .MuiInputBase-input": { color: "var(--text-primary)" },
              "& .MuiFormLabel-root": { color: "var(--text-tertiary)" },
              "& .MuiInputBase-root": {
                borderColor: "var(--reverse-color)",
                backgroundColor: "var(--background-main)",
              },
              "& .MuiSvgIcon-root": {
                color: "var(--text-tertiary)",
              },
            }}
            {...params}
            label={label}
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </div>
  );
};

export default Autocomplete;
