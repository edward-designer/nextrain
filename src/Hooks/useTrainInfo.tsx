import { useState, useEffect, useCallback } from "react";
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

const findToilets = (formation: TTrainInfo["formation"]): boolean => {
  if (formation && Array.isArray(formation?.coaches)) {
    return formation.coaches.reduce(
      (acc, cur) => cur.toilet?.status === 1 || acc,
      false
    );
  }
  return false;
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
    formation,
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
  const hasToilet = findToilets(formation);

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
    hasToilet,
  };
  return formattedTrainInfo;
};

const useTrainInfo = ({ from, to }: TFromTo, timeFrom: number = 0) => {
  const [response, setResponse] = useState<TParsedTrainInfo[] | null>(null);
  const [error, setError] = useState<string>("");
  const [notice, setNotice] = useState<{ value: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTrainInfo = useCallback(
    (time: number = 0) => {
      if (from !== "") {
        setLoading(true);
        const apiTo = to ? `${to}` : "NIL";
        const timeOffset = time;
        const http =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3001"
            : "https://nextrains.herokuapp.com";
        const trainApi = `${http}/api/${from}/to/${apiTo}/${timeOffset}`;
        axios
          .get(trainApi)
          .then((response) => {
            const notice = response.data.nrccMessages;
            if (notice) setNotice(notice);
            let trainServices = response.data.trainServices;
            console.log("1", trainServices);
            trainServices = trainServices?.map((train: TTrainInfo) => {
              const formattedTrainInfo = parseTrainInfo(train, to);
              return { ...formattedTrainInfo };
            });
            setResponse(trainServices);
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [from, to]
  );

  const refetch = useCallback(
    (time: number = 0) => {
      fetchTrainInfo(time);
    },
    [fetchTrainInfo]
  );

  useEffect(() => {
    fetchTrainInfo();
  }, [fetchTrainInfo, from, to]);

  return { response, error, notice, loading, refetch };
};

export default useTrainInfo;
