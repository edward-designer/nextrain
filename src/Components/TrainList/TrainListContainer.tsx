import React, { useState, useContext } from "react";

import { TrainScheduleContext } from "../../Context/TrainContext";
import TrainRowContainer from "./TrainRowContainer";

import { TTrainInfo, TFromTo } from "../../Types/types";

import { isTime1LaterThanTime2 } from "../../Utils/helpers";

type TTrainListContainer = {
  response: TTrainInfo[] | null;
  fromTo: TFromTo;
};

const TrainListContainer = ({ response, fromTo }: TTrainListContainer) => {
  const [arrivalTime, setArrivalTime] = useState("");
  const [rowSelected, setRowSelected] = useState(false);
  const { time, toStation } = useContext(TrainScheduleContext);
  console.log(fromTo, toStation);
  if (!fromTo.from)
    return (
      <div className="p-4 text-text-inactive text-xs">
        Please begin by selecting the departure station.
      </div>
    );
  if (!response)
    return (
      <div className="p-4 text-text-inactive text-xs">
        Sorry, no trains are found.
      </div>
    );

  const trainList =
    toStation === fromTo.from
      ? response.filter((trainDetails) =>
          isTime1LaterThanTime2(trainDetails.std, time)
        )
      : response;

  return (
    <>
      {trainList.map((trainDetails) => (
        <TrainRowContainer
          key={trainDetails.serviceIdUrlSafe}
          fromTo={fromTo}
          trainDetails={trainDetails}
          arrivalTime={arrivalTime}
          setArrivalTime={setArrivalTime}
          rowSelected={rowSelected}
          setRowSelected={setRowSelected}
        />
      ))}
      {trainList.length === 0 && (
        <div className="p-4 text-text-inactive text-xs">
          Sorry, no trains are found currently. Check back later to look for
          available trains.
        </div>
      )}
    </>
  );
};

export default TrainListContainer;
