import React from "react";

import TrainRowContainer from "./TrainRowContainer";

import { TTrainInfo, TFromTo } from "../../Types/types";

type TTrainListContainer = {
  response: TTrainInfo[] | null;
  fromTo: TFromTo;
};

const TrainListContainer = ({ response, fromTo }: TTrainListContainer) => {
  if (!fromTo.from)
    return (
      <div className="p-4">
        Please begin by selecting the departure station.
      </div>
    );
  if (!response) return <div className="p-4">Sorry, no trains are found.</div>;
  return (
    <>
      {response.map((trainDetails) => (
        <TrainRowContainer
          key={trainDetails.serviceIdUrlSafe}
          fromTo={fromTo}
          trainDetails={trainDetails}
        />
      ))}
    </>
  );
};

export default TrainListContainer;
