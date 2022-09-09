import React, { useState, useEffect, useContext } from "react";
import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import WcIcon from "@mui/icons-material/Wc";

import { SelectedTrainContext } from "../../Context/TrainContext";

import CellPlatform from "./CellPlatform";
import CellTime from "./CellTime";
import CellDestination from "./CellDestination";
import CellCountDown from "./CellCountDown";
import CellChangeTimer from "./CellChangeTimer";

import { minutesDifference, isNextDay } from "../../Utils/helpers";

import { TFromTo, TParsedTrainInfo, TrainStatus } from "../../Types/types";

type TTrainRowContainer = {
  fromTo: TFromTo;
  trainDetails: TParsedTrainInfo;
  rowSelected: boolean;
  setRowSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const TrainRowContainer = ({
  trainDetails,
  fromTo,
  rowSelected,
  setRowSelected,
}: TTrainRowContainer) => {
  const [isSelected, setIsSelected] = useState(false);
  const { toTime, setToTime, toStation, setToStation } =
    useContext(SelectedTrainContext);

  const {
    isRunning,
    status,
    arrivalTime,
    std,
    platform,
    endStation,
    arrivalTimeDestination,
    callingPoint,
    reason,
    hasToilet,
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
  const toggleTrainSelect = (time: string | null) => {
    if (!isRunning) return null;
    if (time === null) time = "";
    setRowSelected(!isSelected);
    if (fromTo.to === toStation || !toStation) {
      if (isSelected) {
        setToTime("");
        setToStation("");
      } else {
        setToTime(time);
        setToStation(fromTo.to);
      }
    }
    setIsSelected((isSelected) => {
      return !isSelected;
    });
  };

  return (
    <div
      onClick={() => toggleTrainSelect(arrivalTimeDestination)}
      onKeyDown={(e) => {
        if (e.key === "Enter") toggleTrainSelect(arrivalTimeDestination);
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
      <div className="flex flex-row gap-1 items-center py-3">
        <div className="w-3 flex items-center justify-center text-xs text-button-color">
          {!isRunning ? (
            ""
          ) : isSelected ? (
            <RadioButtonCheckedIcon sx={{ fontSize: "14px" }} />
          ) : (
            <RadioButtonUncheckedOutlinedIcon
              sx={{ color: "var(--border-notice)", fontSize: "14px" }}
            />
          )}
        </div>
        <CellTime
          status={status}
          arrivalTime={arrivalTime}
          arrivalTimeDestination={arrivalTimeDestination}
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
        />
        {hasToilet && (
          <div className="self-start">
            <WcIcon
              sx={{ fontSize: "medium", color: "var(--text-tertiary)" }}
            />
          </div>
        )}
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
