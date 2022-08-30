import React from "react";

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
  const timeArrivalDestination =
    trainDetails.subsequentCallingPoints[0].callingPoint.filter(
      (station) => station.crs === fromTo.to
    )[0]?.st || "";
  const isDelayed = trainDetails.etd === "Delayed";
  const isCancelled = trainDetails.etd === "Cancelled";

  /* minor delay is not shown as official delay but has a later etd */
  const isMinorDelayed =
    trainDetails.etd !== "On time" && trainDetails.etd !== "Delayed";

  const updatedDepartureTime = isMinorDelayed
    ? trainDetails.etd
    : trainDetails.std;
  const [hour, minute] = updatedDepartureTime.split(":");
  const departureDateObj = new Date();
  departureDateObj.setHours(parseInt(hour));
  departureDateObj.setMinutes(parseInt(minute));
  departureDateObj.setSeconds(0);

  const nowTime = currentTime();
  const isDeparted = updatedDepartureTime <= nowTime;

  return (
    <div
      className={`flex flex-row gap-2 items-center py-3
        ${isDelayed ? `bg-amber-100` : ""} 
        ${isCancelled ? `bg-amber-200` : ""} 
        ${isDeparted ? `bg-slate-100` : ""} 
      `}
    >
      <CellTime
        timeArrivalDestination={timeArrivalDestination}
        isDelayed={isDelayed}
        isCancelled={isCancelled}
        std={trainDetails.std}
        etd={trainDetails.etd}
      />
      <CellPlatform
        platform={trainDetails.platform}
        isDeparted={isDeparted}
        isCancelled={isCancelled}
      />
      <CellCountDown
        departureDateObj={departureDateObj}
        isDeparted={isDeparted}
      />
      <CellDestination
        destination={trainDetails.destination[0]}
        subsequentCallingPoints={trainDetails.subsequentCallingPoints[0]}
        fromTo={fromTo}
      />
    </div>
  );
};

export default TrainRowContainer;
