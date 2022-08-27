import React from "react";

export type TFromToType = {
  from: string | null;
  to: string | null;
};

export enum Label {
  from = "from",
  to = "to",
}

export type TAutocompleteProps = {
  label: Label;
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
