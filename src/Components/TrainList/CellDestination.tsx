import React from "react";

import { TFromTo } from "../../Types/types";

type TCellDestination = {
  destination: {
    locationName: string;
  };
  subsequentCallingPoints: {
    callingPoint:
      | {
          locationName: string;
          crs: string;
          st: string;
          et: string;
        }[]
      | null;
  };
  fromTo: TFromTo;
};

const CellDestination = ({
  destination,
  subsequentCallingPoints,
  fromTo,
}: TCellDestination) => {
  const callingPoints = subsequentCallingPoints?.callingPoint;
  return (
    <div className="basis-7/12 flex flex-col text-sm">
      <span className="text-slate-600">→ {destination.locationName}</span>
      {callingPoints !== null && (
        <span className="text-[8px] leading-3">
          {"> "}
          {callingPoints.length === 0
            ? "-"
            : callingPoints.map((station, index) => (
                <li
                  key={station.crs}
                  className={`inline-block mr-1 ${
                    station.crs === fromTo.to ? "font-bold" : ""
                  }`}
                >
                  {`${station.locationName} 
                    ${
                      station.crs === fromTo.to
                        ? station?.et !== "On time"
                          ? `(${station.et})`
                          : `(${station.st})`
                        : ""
                    } 
                    ${index === callingPoints.length - 1 ? "" : ">"}
                `}
                </li>
              ))}
        </span>
      )}
    </div>
  );
};

export default CellDestination;
