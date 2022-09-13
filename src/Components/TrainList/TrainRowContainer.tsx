import React, { useState, useEffect, useContext } from "react";
import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import { SelectedTrainContext } from "../../Context/TrainContext";

import CellPlatform from "./CellPlatform";
import CellTime from "./CellTime";
import CellDestination from "./CellDestination";
import CellCountDown from "./CellCountDown";
import CellChangeTimer from "./CellChangeTimer";
import RowTag from "./RowTag";

import { minutesDifference, isNextDay } from "../../Utils/helpers";

import { TFromTo, TParsedTrainInfo, TrainStatus } from "../../Types/types";

type TTrainRowContainer = {
  fromTo: TFromTo;
  trainDetails: TParsedTrainInfo;
  rowSelected: boolean;
  setRowSelected: React.Dispatch<React.SetStateAction<boolean>>;
  finalDestination: string;
};

const TrainRowContainer = ({
  trainDetails,
  fromTo,
  rowSelected,
  setRowSelected,
  finalDestination,
}: TTrainRowContainer) => {
  const [isSelected, setIsSelected] = useState(false);
  const {
    setFromTime,
    toTime,
    setToTime,
    toStation,
    setToStation,
    setTrainId,
    reset,
  } = useContext(SelectedTrainContext);

  const {
    serviceIdUrlSafe,
    isRunning,
    status,
    arrivalTime,
    std,
    platform,
    endStation,
    arrivalTimeDestination,
    arrivalTimeFinalDestination,
    callingPoint,
    reason,
    fastest,
    isDirect,
  } = trainDetails;

  /* if the first leg train is not selected, the second leg will show all trains */
  useEffect(() => {
    if (!toTime) {
      setRowSelected(false);
      setIsSelected(false);
    }
  }, [toTime, setRowSelected, setIsSelected]);

  if (rowSelected && !isSelected) return null;

  /* if a train is selected, the connecting trains will show the time for changing platforms */
  const showChangeTimer = toStation === fromTo.from && isRunning;
  let changeTime = null;
  if (arrivalTime && showChangeTimer) {
    changeTime = minutesDifference(toTime, arrivalTime);
  }

  let departureDateObj;
  if (isRunning && arrivalTime) {
    /* departureDateObj for countdown to CellCountDown */
    departureDateObj = new Date();
    const [hour, minute] = arrivalTime.split(":");
    if (departureDateObj) {
      departureDateObj.setHours(parseInt(hour));
      departureDateObj.setMinutes(parseInt(minute));
      departureDateObj.setSeconds(0);
      if (isNextDay(arrivalTime)) {
        departureDateObj.setDate(departureDateObj.getDate() + 1);
      }
    }
  }
  const toggleTrainSelect = (
    arrivalTime: string | null,
    arrivalDestinationTime: string | null,
    serviceIdUrlSafe: string
  ) => {
    if (!isRunning) return null;
    if (arrivalTime === null) arrivalTime = "";
    if (arrivalDestinationTime === null) arrivalDestinationTime = "";
    setRowSelected(!isSelected);
    if (fromTo.to === toStation || !toStation) {
      if (isSelected) {
        reset();
      } else {
        setFromTime(arrivalTime);
        setToTime(arrivalDestinationTime);
        setToStation(fromTo.to);
        setTrainId(serviceIdUrlSafe);
      }
    }
    setIsSelected((isSelected) => {
      return !isSelected;
    });
  };

  const showTags = isDirect || fastest;

  return (
    <div
      onClick={() =>
        toggleTrainSelect(arrivalTime, arrivalTimeDestination, serviceIdUrlSafe)
      }
      onKeyDown={(e) => {
        if (e.key === "Enter")
          toggleTrainSelect(
            arrivalTime,
            arrivalTimeDestination,
            serviceIdUrlSafe
          );
      }}
      className={`flex flex-col border-b-background-form border-b-4 border-dotted
      ${isRunning ? "" : `cursor-default`} 
        ${status === TrainStatus.departed ? `bg-background-departed` : ""} 
        ${
          status === TrainStatus.delayed ||
          status === TrainStatus.delayedWithNewArrivalTime
            ? `bg-background-delayed`
            : status === TrainStatus.cancelled
            ? `bg-background-cancelled`
            : ""
        }
        `}
      role="button"
      tabIndex={0}
      aria-pressed="false"
    >
      {showTags && (
        <div className="-mt-1 -mb-4">
          {fastest && (
            <RowTag className="z-20 bg-hover-color after:border-l-hover-color">
              Fastest
            </RowTag>
          )}
          {isDirect && (
            <RowTag className="z-10 bg-train-direct after:border-l-train-direct">
              Direct
            </RowTag>
          )}
          {isSelected && isDirect && (
            <RowTag className="w-[180px] z-1 bg-background-nochange after:border-l-background-nochange">
              No need to change at {fromTo.to}
            </RowTag>
          )}
        </div>
      )}
      <div className="flex flex-row gap-1 items-center py-3">
        <div className="w-3 flex items-center justify-center text-xs text-button-color">
          {!isRunning ? (
            ""
          ) : isSelected ? (
            <TaskAltIcon sx={{ fontSize: "14px" }} />
          ) : (
            ""
          )}
        </div>
        <CellTime
          status={status}
          arrivalTime={arrivalTime}
          arrivalTimeDestination={
            arrivalTimeDestination
          }
          arrivalTimeFinalDestination={
            arrivalTimeFinalDestination
          }
          std={std}
        />
        <CellPlatform status={status} platform={platform} />
        {showChangeTimer ? (
          <CellChangeTimer changeTime={changeTime} />
        ) : (
          <CellCountDown
            departureDateObj={departureDateObj}
            isRunning={isRunning}
          />
        )}
        <CellDestination
          destination={endStation}
          subsequentCallingPoints={callingPoint}
          fromTo={fromTo}
          status={status}
          finalDestination={finalDestination}
        />
      </div>
      {reason && (
        <div className="flex items-center text-[7pt] -mt-3 leading-3 p-1 italic text-text-highlight">
          <RailwayAlertIcon className="text-text-highlight px-1" />
          <div>{reason}</div>
        </div>
      )}
    </div>
  );
};

export default TrainRowContainer;
