import React from "react";
import AutocompleteField from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import useTrainStationsList from "../../Hooks/useTrainStationsList";

import { TAutocompleteProps } from "../../Types/types";

const Autocomplete = ({ label, changeHandler, value }: TAutocompleteProps) => {
  const [stationList] = useTrainStationsList();

  return (
    <div className="my-4">
      <AutocompleteField
        id={label}
        options={stationList}
        autoHighlight
        getOptionLabel={(station) =>
          `${station.stationName} (${station.crsCode})`
        }
        value={
          stationList.filter((station) => station.crsCode === value[label])[0]
        }
        onChange={(_, newStation) => {
          changeHandler({ ...value, [label]: newStation?.crsCode || "" });
        }}
        renderInput={(params) => (
          <TextField
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
