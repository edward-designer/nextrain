import React from "react";

export type TFromToType = {
  from: string | null;
  to: string | null;
};

export type TAutocompleteProps = {
  label: string;
  changeHandler: React.Dispatch<React.SetStateAction<TFromToType>>;
  value: TFromToType;
};

export type TTrainInfo = {
  isCancelled: boolean;
  etd: string;
  delayReason: string;
  std: string;
  destination: {
    locationName: string;
  }[];
  platform: string;
  subsequentCallingPoints: {
    callingPoint: {
      locationName: string;
      crs: string;
      st: string;
    }[];
  }[];
  serviceIdUrlSafe: string;
};
