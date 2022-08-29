import React from "react";

import CellPlatform from "./CellPlatform";
import CellTime from "./CellTime";
import CellDestination from "./CellDestination";

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
  const isDelayed =
    trainDetails.etd === "Delayed" ||
    (trainDetails.etd !== "On time" && trainDetails.std !== trainDetails.etd);
  const isCancelled = trainDetails.etd === "Cancelled";

  return (
    <div
      className={`flex flex-row gap-3 items-center border-b py-2 
        ${isDelayed ? `bg-amber-50` : ""} 
        ${isCancelled ? `bg-amber-150` : ""} 
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
        isCancelled={isCancelled}
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
