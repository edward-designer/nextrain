import { useState, useEffect } from "react";
import axios from "axios";

import {
  TFromTo,
  TTrainInfo,
  TrainStatus,
  TParsedTrainInfo,
} from "../Types/types";
import {
  isTimeFormat,
  isTime1LaterThanTime2,
  currentTime,
} from "../Utils/helpers";

const getTrainStatus = (
  train: TTrainInfo,
  arrivalTime: string | null
): TrainStatus => {
  let status = TrainStatus.ontime;
  if (train.delayReason !== null || train.etd === "Delayed")
    status = isTimeFormat(train.etd)
      ? TrainStatus.delayedWithNewArrivalTime
      : TrainStatus.delayed;
  if (train.isCancelled || train.cancelReason) status = TrainStatus.cancelled;
  arrivalTime &&
    isTime1LaterThanTime2(currentTime(), arrivalTime) &&
    (status = TrainStatus.departed);
  return status;
};

const parseTrainInfo = (
  train: TTrainInfo,
  to: string | null
): TParsedTrainInfo => {
  const {
    subsequentCallingPoints,
    etd,
    std,
    destination,
    platform,
    serviceIdUrlSafe,
    delayReason,
    cancelReason,
  } = train;
  const arrivalTime =
    etd === "Cancelled" || etd === "Delayed"
      ? null
      : isTimeFormat(etd)
      ? etd
      : std;
  const status = getTrainStatus(train, arrivalTime);
  const runningStatus = [
    TrainStatus.ontime,
    TrainStatus.delayedWithNewArrivalTime,
  ];
  const isRunning = runningStatus.includes(status);
  const callingPoint = subsequentCallingPoints[0].callingPoint;
  const destinationStationInfo = callingPoint.filter(
    (station) => station.crs === to
  )[0];
  const arrivalTimeDestination = isTimeFormat(destinationStationInfo?.et)
    ? destinationStationInfo?.et
    : destinationStationInfo?.st || null;
  const endStation = destination[0].locationName;
  const endStationCRS = destination[0].crs;
  const reason = cancelReason || delayReason || null;

  const formattedTrainInfo = {
    serviceIdUrlSafe,
    endStation,
    endStationCRS,
    isRunning,
    status,
    std,
    platform,
    callingPoint,
    arrivalTime,
    arrivalTimeDestination,
    reason,
  };
  return formattedTrainInfo;
};

const useTrainInfo = ({ from, to }: TFromTo, timeFrom: number = 0) => {
  const [response, setResponse] = useState<TParsedTrainInfo[] | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTrainInfo = (time: number = 0) => {
    if (from !== "") {
      setLoading(true);
      const apiTo = to ? `/to/${to}` : "";
      const timeOffset = time;

      const trainApi = `https://huxley2.azurewebsites.net/departures/${from}${apiTo}/20?accessToken=${process.env.REACT_APP_accessToken}&expand=true&timeOffset=${timeOffset}&timeWindow=120`;
      axios
        .get(trainApi)
        .then((response) => {
          let trainServices = response.data.trainServices;
          console.log(trainServices);
          trainServices = trainServices?.map((train: TTrainInfo) => {
            const formattedTrainInfo = parseTrainInfo(train, to);
            return { ...formattedTrainInfo };
          });
          console.log(trainServices);
          setResponse(trainServices);
          // important notice: response.data.nrccMessages
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const refetch = (time: number = 0) => {
    fetchTrainInfo(time);
  };

  useEffect(() => {
    fetchTrainInfo();
  }, [from, to]);

  return { response, error, loading, refetch };
};

export default useTrainInfo;
