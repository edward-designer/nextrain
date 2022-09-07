import React, { useState, useContext } from "react";

import { SelectedTrainContext } from "../../Context/TrainContext";
import TrainRowContainer from "./TrainRowContainer";

import { TParsedTrainInfo, TFromTo } from "../../Types/types";

import { isTime1LaterThanTime2 } from "../../Utils/helpers";

type TTrainListContainer = {
  response: TParsedTrainInfo[] | null;
  fromTo: TFromTo;
};

const TrainListContainer = ({ response, fromTo }: TTrainListContainer) => {
  const [rowSelected, setRowSelected] = useState(false);
  const { toTime, toStation } = useContext(SelectedTrainContext);

  // NO from station is entered
  if (!fromTo.from)
    return (
      <div className="p-4 text-text-inactive text-xs">
        Please begin by selecting the departure station.
      </div>
    );

  // NO trains found
  if (!response)
    return (
      <div className="p-4 text-text-inactive text-xs">
        Sorry, no trains are found.
      </div>
    );

  const trainList =
    toStation === fromTo.from
      ? response.filter((trainDetails) =>
          isTime1LaterThanTime2(trainDetails.arrivalTime, toTime)
        )
      : response;

  return (
    <>
      {trainList &&
        trainList.map((trainDetails) => (
          <TrainRowContainer
            key={trainDetails.serviceIdUrlSafe}
            fromTo={fromTo}
            trainDetails={trainDetails}
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
