import React from "react";

import { TFromTo, TrainStatus } from "../../Types/types";

type TCellDestination = {
  destination: string;
  subsequentCallingPoints: {
    locationName: string;
    crs: string;
    st: string;
    et: string;
  }[];
  fromTo: TFromTo;
  status: TrainStatus;
  finalDestination: string;
};

const CellDestination = ({
  destination,
  subsequentCallingPoints,
  fromTo,
  status,
  finalDestination,
}: TCellDestination) => {
  return (
    <div className="basis-7/12 flex flex-col text-sm">
      <span className="text-slate-600">→ {destination}</span>
      {subsequentCallingPoints !== null && (
        <span className="text-[8px] leading-3">
          {subsequentCallingPoints.length === 0 ||
          status === TrainStatus.cancelled
            ? ""
            : subsequentCallingPoints.map((station, index) => (
                <span key={station.crs}>
                  <span className="text-text-notice-icon">{"> "}</span>
                  <li
                    className={`inline-block mr-1 ${
                      station.crs === fromTo.to ? "font-bold" : ""
                    } ${
                      station.crs === finalDestination
                        ? "font-bold text-train-direct"
                        : ""
                    }`}
                  >
                    {`${station.locationName} 
                    ${
                      station.crs === fromTo.to ||
                      station.crs === finalDestination
                        ? station?.et !== "On time"
                          ? `(${station.et})`
                          : `(${station.st})`
                        : ""
                    } 
                `}
                  </li>
                </span>
              ))}
        </span>
      )}
    </div>
  );
};

export default CellDestination;
