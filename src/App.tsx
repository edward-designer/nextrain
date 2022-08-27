import React, { useState, useEffect } from "react";
import SyncIcon from "@mui/icons-material/Sync";
import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

import useTrainInfo from "./Hooks/useTrainInfo";

import Button from "./Components/Button";
import Autocomplete from "./Components/Autocomplete";

import { TFromToType } from "./Types/types";
import Error from "./Components/Common/Error";

const initialStations = {
  from: "",
  to: "",
};

function App() {
  const [fromTo, setFromTo] = useState<TFromToType>(initialStations);
  const { response, error, loading, refetch } = useTrainInfo(fromTo);

  return (
    <div className="max-w-xs mx-auto">
      <Error error={error} />
      <div>
        <Autocomplete label="from" changeHandler={setFromTo} value={fromTo} />
        <Autocomplete label="to" changeHandler={setFromTo} value={fromTo} />
      </div>
      <div className="flex flex-col">
        {loading
          ? "loading"
          : response?.map((train) => (
              <div
                key={train.serviceIdUrlSafe}
                className={`flex flex-row gap-3 items-center border-b py-2 ${
                  train.etd !== "On time" ? "bg-amber-50" : ""
                } ${train.isCancelled ? "bg-amber-150" : ""} `}
              >
                <div
                  className={`basis-1/6 flex flex-col font-medium ${
                    train.etd !== "On time" ? "text-red-900" : ""
                  }`}
                >
                  <span
                    className={
                      train.etd !== "On time"
                        ? "line-through text-xs leading-3"
                        : ""
                    }
                  >
                    {train.std}
                  </span>
                  <span
                    className={`${
                      train.etd === "Delayed" || train.etd === "Cancelled"
                        ? "text-[8px] font-bold"
                        : ""
                    }`}
                  >
                    {train.etd !== "On time" ? train.etd : ""}
                  </span>
                </div>
                <div
                  className={`basis-1/6 flex flex-col items-center p-2 bg-slate-600 text-white ${
                    !!train.platform ? "" : "bg-transparent text-slate-600"
                  }`}
                >
                  {!!train.platform ? (
                    <>
                      <span className="text-[10px] text-center leading-3">
                        Platform
                      </span>
                      <span className="text-2xl font-bold text-center leading-6">
                        {train.platform}
                      </span>
                    </>
                  ) : train.etd === "Cancelled" ? (
                    <RailwayAlertIcon />
                  ) : (
                    <HourglassEmptyIcon />
                  )}
                </div>
                <div className="basis-4/6 flex flex-col text-sm">
                  <span>to {train.destination[0].locationName}</span>

                  <span className="text-[8px] leading-3">
                    stops:{" "}
                    {train.subsequentCallingPoints[0].callingPoint.length === 0
                      ? "-"
                      : train.subsequentCallingPoints[0].callingPoint.map(
                          (station, index) => (
                            <li
                              className={`inline-block mr-1 ${
                                station.crs === fromTo.to ? "font-bold" : ""
                              }`}
                            >
                              {`${station.locationName} 
                              ${
                                station.crs === fromTo.to
                                  ? `(${station.st})`
                                  : ""
                              } 
                              ${
                                index ===
                                train.subsequentCallingPoints[0].callingPoint
                                  .length -
                                  1
                                  ? ""
                                  : ">"
                              }`}
                            </li>
                          )
                        )}
                  </span>
                </div>
              </div>
            ))}
      </div>
      <Button clickHandler={refetch}>
        <SyncIcon />
      </Button>
    </div>
  );
}

export default App;
