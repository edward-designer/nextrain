import React, { useState, useContext } from "react";

import { SelectedTrainContext } from "../../Context/TrainContext";
import TrainRowContainer from "./TrainRowContainer";

import { TParsedTrainInfo, TFromTo } from "../../Types/types";

import { isTime1LaterThanTime2 } from "../../Utils/helpers";

type TTrainListContainer = {
  response: TParsedTrainInfo[] | null;
  fromTo: TFromTo;
  finalDestination: string;
};

const TrainListContainer = ({ response, fromTo, finalDestination }: TTrainListContainer) => {
  const [rowSelected, setRowSelected] = useState(false);
  const { toTime, toStation } = useContext(SelectedTrainContext);

  if (!fromTo.from)
    // NO from station is entered
    return (
      <div className="p-4 text-text-inactive text-xs">
        Please begin by entering the departure station in the 'from' field
        above.
      </div>
    );

  // NO trains found
  if (!response)
    return (
      <div className="p-4 text-text-inactive text-xs">
        Sorry, no direct trains between the two stations are found.
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
            finalDestination={finalDestination}
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
