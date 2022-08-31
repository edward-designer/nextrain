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
          station && `${station.stationName} (${station.crsCode})`
        }
        value={
          stationList.filter(
            (station) => station.crsCode === value[label]
          )[0] || null
        }
        onChange={(_, newStation) => {
          changeHandler({ ...value, [label]: newStation?.crsCode || "" });
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

{
  /*
<div
  role="presentation"
  class="MuiAutocomplete-popper css-1s5lphu-MuiPopper-root-MuiAutocomplete-popper MuiPopperUnstyled-root"
  style="width: 296px; position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(527.5px, 192px, 0px);"
  data-popper-placement="bottom"
>
  <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAutocomplete-paper css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper">
    <ul
      class="MuiAutocomplete-listbox css-b7k0tb-MuiAutocomplete-listbox"
      role="listbox"
      id="to-listbox"
      aria-labelledby="to-label"
    >
      <li
        tabindex="-1"
        role="option"
        id="to-option-0"
        data-option-index="0"
        aria-disabled="false"
        aria-selected="false"
        class="MuiAutocomplete-option Mui-focused"
      >
        Aber (ABE)
      </li>
      <li
        tabindex="-1"
        role="option"
        id="to-option-1"
        data-option-index="1"
        aria-disabled="false"
        aria-selected="false"
        class="MuiAutocomplete-option"
      >
        Llanaber (LLA)
      </li>
    </ul>
  </div>
</div>;*/
}
