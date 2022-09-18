import React, { useState, useContext, useEffect } from "react";

import { SelectedTrainContext } from "../../Context/TrainContext";

import TrainRowContainer from "./TrainRowContainer";

import { TParsedTrainInfo, TFromTo } from "../../Types/types";

import { isTime1LaterThanTime2, currentTime } from "../../Utils/helpers";

type TTrainListContainer = {
  response: TParsedTrainInfo[] | null;
  fromTo: TFromTo;
  finalDestination: string;
  refetch: (offset: string | null) => void;
  timeOffset: string | null;
};

const TrainListContainer = ({
  response,
  fromTo,
  finalDestination,
  refetch,
  timeOffset,
}: TTrainListContainer) => {
  const [rowSelected, setRowSelected] = useState(false);
  const { fromTime, toStation } = useContext(SelectedTrainContext);

  useEffect(() => {
    const document = window.document;
    const reloadWhenActive = () => {
      if (!document.hidden && !rowSelected) {
        refetch(timeOffset);
      }
    };
    document.addEventListener("visibilitychange", reloadWhenActive);
    return () =>
      document.removeEventListener("visibilitychange", reloadWhenActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelected, timeOffset]);

  useEffect(() => {
    const timer = window.setInterval(
      () =>
        (!rowSelected ||
          (fromTo.to === toStation &&
            isTime1LaterThanTime2(fromTime, currentTime())) ||
          fromTo.to !== toStation) &&
        refetch(timeOffset),
      60000
    );
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelected, timeOffset]);

  if (!fromTo.from)
    // NO from station is entered
    return (
      <div className="p-4 text-text-inactive text-xs">
        Please begin by entering the departure station in the 'from' field.
      </div>
    );

  // NO trains found
  if (!response)
    return (
      <div className="p-4 text-text-inactive text-xs">
        Sorry, no direct trains between the two stations are found.
      </div>
    );
  const trainList = response;

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
