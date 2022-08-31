import React from "react";
import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";

import CellPlatform from "./CellPlatform";
import CellTime from "./CellTime";
import CellDestination from "./CellDestination";
import CellCountDown from "./CellCountDown";

import { currentTime } from "../../Utils/helpers";

import { TFromTo, TTrainInfo } from "../../Types/types";

type TTrainRowContainer = {
  fromTo: TFromTo;
  trainDetails: TTrainInfo;
};

const TrainRowContainer = ({ trainDetails, fromTo }: TTrainRowContainer) => {
  const nowTime = currentTime();

  /* in case of delay, not etd time is issued */
  const isDelayed = trainDetails.etd === "Delayed";
  const isCancelled = trainDetails.etd === "Cancelled";
  const isOnTime = !isDelayed && !isCancelled;
  /* minor delay is not shown as official delay but has a later etd */
  const isMinorDelayed = isOnTime && trainDetails.etd !== "On time";

  if (isOnTime) {
    const timeArrivalDestination = trainDetails.subsequentCallingPoints
      ? trainDetails.subsequentCallingPoints[0].callingPoint.filter(
          (station) => station.crs === fromTo.to
        )[0]?.st
      : "";

    /* if std/etd time is available */
    const updatedDepartureTime = isMinorDelayed
      ? trainDetails.etd
      : trainDetails.std;

    const [hour, minute] = updatedDepartureTime.split(":");
    const isNextDay = Number(new Date().getHours()) - parseInt(hour) > 12;

    const departureDateObj = new Date();
    if (departureDateObj) {
      departureDateObj.setHours(parseInt(hour));
      departureDateObj.setMinutes(parseInt(minute));
      departureDateObj.setSeconds(0);
      if (isNextDay) {
        departureDateObj.setDate(departureDateObj.getDate() + 1);
      }
    }
    const adjustedDepartureTime = isNextDay
      ? `${parseInt(hour) + 24}:${minute}`
      : updatedDepartureTime;
    const hasDeparted = adjustedDepartureTime <= nowTime;

    return (
      <div
        className={`flex flex-row gap-2 items-center py-3 border-collapse border-b-background-form border-b-4 border-dotted
        ${hasDeparted ? `bg-background-departed` : ""} 
      `}
      >
        <CellTime
          timeArrivalDestination={timeArrivalDestination}
          std={trainDetails.std}
          etd={trainDetails.etd}
        />
        <CellPlatform
          platform={trainDetails.platform}
          hasDeparted={hasDeparted}
        />
        <CellCountDown
          departureDateObj={departureDateObj}
          hasDeparted={hasDeparted}
        />
        <CellDestination
          destination={trainDetails.destination[0]}
          subsequentCallingPoints={
            trainDetails.subsequentCallingPoints &&
            trainDetails.subsequentCallingPoints[0]
          }
          fromTo={fromTo}
        />
      </div>
    );
  }

  let delayedtimeArrivalDestination = trainDetails.subsequentCallingPoints
    ? trainDetails.subsequentCallingPoints[0].callingPoint.filter(
        (station) => station.crs === fromTo.to
      )[0]?.et
    : "";
  if (
    delayedtimeArrivalDestination === "On time" ||
    delayedtimeArrivalDestination === "Delayed"
  ) {
    delayedtimeArrivalDestination =
      trainDetails.subsequentCallingPoints[0].callingPoint.filter(
        (station) => station.crs === fromTo.to
      )[0].st;
  }

  return (
    <div
      className={`flex flex-col ${
        isDelayed
          ? `bg-background-delayed`
          : isCancelled
          ? `bg-background-cancelled`
          : ""
      } `}
    >
      <div className="flex flex-row gap-2 items-center py-3">
        <CellTime
          timeArrivalDestination={delayedtimeArrivalDestination}
          isDelayed={isDelayed}
          isCancelled={isCancelled}
          std={trainDetails.std}
          etd={trainDetails.etd}
        />
        <CellPlatform
          platform={trainDetails.platform}
          isCancelled={isCancelled}
        />
        <CellCountDown isCancelledOrDelayed={!isOnTime} />
        <CellDestination
          destination={trainDetails.destination[0]}
          subsequentCallingPoints={
            trainDetails.subsequentCallingPoints &&
            trainDetails.subsequentCallingPoints[0]
          }
          fromTo={fromTo}
        />
      </div>
      <div className="flex text-[7pt] -mt-3 leading-3 p-1 italic text-text-highlight border-b-4 border-dotted border-border-notic border-collapse">
        <RailwayAlertIcon className="text-text-highlight px-1" />
        {trainDetails.delayReason || trainDetails.cancelReason}
      </div>
    </div>
  );
};

export default TrainRowContainer;
