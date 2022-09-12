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
  to: string | null,
  destinationStation?: string
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
  const fastest = false;
  let isDirect = false;

  if (destinationStation) {
    isDirect = callingPoint.some(
      (station) => station.crs === destinationStation
    );
  }

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
    fastest,
    isDirect,
  };
  return formattedTrainInfo;
};

const useTrainInfo = (
  { from, to }: TFromTo,
  timeFrom: number = 0,
  destination?: string
) => {
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
            trainServices = trainServices?.map((train: TTrainInfo) => {
              const formattedTrainInfo = parseTrainInfo(train, to, destination);
              return { ...formattedTrainInfo };
            });
            if (trainServices?.length > 1) {
              const runningTrainServices = trainServices.filter(
                (train: TParsedTrainInfo) => train.isRunning
              );
              let fastestArrivalTime =
                runningTrainServices.arrivalTimeDestination;
              let fastestArrivalTrain = 0;
              for (let i = 0; i < trainServices.length; i++) {
                if (
                  isTime1LaterThanTime2(
                    fastestArrivalTime,
                    trainServices[i].arrivalTimeDestination
                  ) ||
                  !fastestArrivalTime ||
                  !trainServices[fastestArrivalTrain].isRunning
                ) {
                  fastestArrivalTime = trainServices[i].arrivalTimeDestination;
                  fastestArrivalTrain = i;
                }
              }
              if (
                fastestArrivalTime &&
                trainServices[fastestArrivalTrain].isRunning
              )
                trainServices[fastestArrivalTrain].fastest = true;
            }
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
    [from, to, destination]
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
