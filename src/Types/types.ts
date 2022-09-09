export type TFromToArr = string[];

export type TFromTo = {
  from: string;
  to: string;
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
  formation: {
    coaches: { toilet: { status: number; value: string } }[];
  } | null;
};

export type TParsedTrainInfo = {
  serviceIdUrlSafe: string;
  isRunning: boolean;
  status: TrainStatus;
  arrivalTime: string | null;
  std: string;
  platform: string;
  endStation: string;
  endStationCRS: string;
  callingPoint: {
    locationName: string;
    crs: string;
    st: string;
    et: string;
  }[];
  arrivalTimeDestination: string | null;
  reason: string | null;
  hasToilet: boolean;
};

export type Theme = "light" | "dark";

export enum TrainStatus {
  "ontime" = "On Time",
  "departed" = "On Time and Departed",
  "delayedWithNewArrivalTime" = "Delayed with a new Arrival Time Set",
  "delayed" = "Delayed",
  "cancelled" = "Cancelled",
}
