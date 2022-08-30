import React from "react";

import { TFromTo } from "../../Types/types";

type TCellDestination = {
  destination: {
    locationName: string;
  };
  subsequentCallingPoints: {
    callingPoint: {
      locationName: string;
      crs: string;
      st: string;
    }[];
  };
  fromTo: TFromTo;
};

const CellDestination = ({
  destination,
  subsequentCallingPoints,
  fromTo,
}: TCellDestination) => {
  return (
    <div className="basis-7/12 flex flex-col text-sm">
      <span className="text-slate-600">
        → {destination.locationName}
      </span>
      <span className="text-[8px] leading-3">
        {"> "}
        {subsequentCallingPoints.callingPoint.length === 0
          ? "-"
          : subsequentCallingPoints.callingPoint.map((station, index) => (
              <li
                key={station.crs}
                className={`inline-block mr-1 ${
                  station.crs === fromTo.to ? "font-bold" : ""
                }`}
              >
                {`${station.locationName} 
                    ${station.crs === fromTo.to ? `(${station.st})` : ""} 
                    ${
                      index === subsequentCallingPoints.callingPoint.length - 1
                        ? ""
                        : ">"
                    }
                `}
              </li>
            ))}
      </span>
    </div>
  );
};

export default CellDestination;
