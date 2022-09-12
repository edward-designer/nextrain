import React from "react";

import TrainList from "./TrainList";

import { convertArrToFromToObject } from "../Utils/helpers";

type TTrainListWrapper = {
  fromToArr: string[];
};

const TrainListWrapper = ({ fromToArr }: TTrainListWrapper) => {
  const { returnArr, destination } = convertArrToFromToObject(fromToArr);
  return (
    <div className="mt-1 md:flex md:items-start md:gap-3 ">
      {returnArr.map((item, inx) => (
        <TrainList
          key={`${item.from}-${item.to}`}
          fromTo={item}
          destination={inx === 0 && returnArr.length === 2 ? destination : ""}
        />
      ))}
    </div>
  );
};

export default TrainListWrapper;
