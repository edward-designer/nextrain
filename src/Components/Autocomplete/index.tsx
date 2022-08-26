import React from "react";
import AutocompleteBase from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import getTrainStation from "../Hooks/getTrainStation";

type AutocompleteProps = {
  label: string;
};

const Autocomplete = ({ label }: AutocompleteProps) => {
  const StationList = getTrainStation();
  return (
    <AutocompleteBase
      id={label}
      options={StationList}
      autoHighlight
      getOptionLabel={(station) => `${station.stationName}(${station.crsCode})`}
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
  );
};

export default Autocomplete;
