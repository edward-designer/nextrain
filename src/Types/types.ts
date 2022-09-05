import React from "react";

export type TFromToArr = string[];

export type TFromTo = {
  from: string | null;
  to: string | null;
};

export enum Label {
  from = "from",
  to = "to",
  change = "change",
}

export type TTrainInfo = {
  isCancelled: boolean;
  isDelayed: boolean;
  etd: string;
  std: string;
  destination: {
    locationName: string;
    crs: string;
  }[];
  platform: string;
  subsequentCallingPoints: {
    callingPoint: {
      locationName: string;
      crs: string;
      st: string;
      et: string;
    }[];
  }[];
  serviceIdUrlSafe: string;
  operator: string;
  delayReason: string;
  cancelReason: string;
};

export type Theme = "light" | "dark";
