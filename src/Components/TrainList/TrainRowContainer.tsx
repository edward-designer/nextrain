import React, { useState, useEffect, useContext } from "react";
import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";

import { TrainScheduleContext } from "../../Context/TrainContext";

import CellPlatform from "./CellPlatform";
import CellTime from "./CellTime";
import CellDestination from "./CellDestination";
import CellCountDown from "./CellCountDown";
import CellChangeTimer from "./CellChangeTimer";

import {
  currentTime,
  isTime1LaterThanTime2,
  isTimeFormat,
  minutesDifference,
} from "../../Utils/helpers";

import { TFromTo, TTrainInfo } from "../../Types/types";

type TTrainRowContainer = {
  fromTo: TFromTo;
  trainDetails: TTrainInfo;
  arrivalTime: string;
  setArrivalTime: (value: string) => void;
  rowSelected: boolean;
  setRowSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const TrainRowContainer = ({
  trainDetails,
  fromTo,
  arrivalTime,
  setArrivalTime,
  rowSelected,
  setRowSelected,
}: TTrainRowContainer) => {
  const [isSelected, setIsSelected] = useState(false);
  const { time, setTime, toStation, setToStation } =
    useContext(TrainScheduleContext);

  useEffect(() => {
    if (!time) {
      setRowSelected(false);
      setIsSelected(false);
    }
  }, [time, setRowSelected, setIsSelected]);

  if (rowSelected && !isSelected) return null;

  const nowTime = currentTime();

  /* in case of delay, not etd time is issued */
  const isDelayed = trainDetails.etd === "Delayed" || trainDetails.isDelayed;
  const isCancelled =
    trainDetails.etd === "Cancelled" || trainDetails.isCancelled;
  const isOnTime = !isDelayed && !isCancelled;
  /* minor delay is not shown as official delay but has a later etd */
  const isMinorDelayed = isOnTime && trainDetails.etd !== "On time";

  if (isOnTime) {
    const timeArrivalDestination = trainDetails.subsequentCallingPoints
      ? trainDetails.subsequentCallingPoints[0].callingPoint.filter(
          (station) => station.crs === fromTo.to
        )[0]?.st
      : "";

    const showChangeTimer = toStation === fromTo.from;
    let changeTime = null;

    if (showChangeTimer) {
      changeTime = minutesDifference(time, timeArrivalDestination);
    }

    /* if std/etd time is available */
    const updatedDepartureTime = isMinorDelayed
      ? trainDetails.etd
      : trainDetails.std;

    let departureDateObj;
    if (isTimeFormat(updatedDepartureTime)) {
      const [hour, minute] = updatedDepartureTime.split(":");
      const isNextDay = Number(new Date().getHours()) - parseInt(hour) > 12;

      departureDateObj = new Date();
      if (departureDateObj) {
        departureDateObj.setHours(parseInt(hour));
        departureDateObj.setMinutes(parseInt(minute));
        departureDateObj.setSeconds(0);
        if (isNextDay) {
          departureDateObj.setDate(departureDateObj.getDate() + 1);
        }
      }
    }

    const hasDeparted = isTime1LaterThanTime2(nowTime, updatedDepartureTime);

    const toggleTrainSelect = (time: string) => {
      setIsSelected((isSelected) => {
        if (fromTo.to === toStation || !toStation) {
          if (isSelected) {
            setArrivalTime("");
            setTime("");
            setToStation("");
          } else {
            setArrivalTime(time);
            setTime(time);
            setToStation(fromTo.to);
          }
        }
        setRowSelected(!isSelected);
        return !isSelected;
      });
    };

    return (
      <div
        onClick={() => toggleTrainSelect(timeArrivalDestination)}
        onKeyDown={(e) => {
          if (e.key === "Enter") toggleTrainSelect(timeArrivalDestination);
        }}
        className={`flex flex-row gap-1 items-center py-3 border-collapse border-b-background-form border-b-4 border-dotted
        ${hasDeparted ? `bg-background-departed` : ""} `}
        role="button"
        tabIndex={0}
        aria-pressed="false"
      >
        <div className="w-3 flex items-center justify-center text-xs text-button-color">
          {isSelected ? (
            <CheckCircleOutlinedIcon sx={{ fontSize: "14px" }} />
          ) : (
            <RadioButtonUncheckedOutlinedIcon
              sx={{ color: "var(--border-notice)", fontSize: "14px" }}
            />
          )}
        </div>
        <CellTime
          timeArrivalDestination={timeArrivalDestination}
          std={trainDetails.std}
          etd={trainDetails.etd}
        />
        <CellPlatform
          platform={trainDetails.platform}
          hasDeparted={hasDeparted}
        />
        {showChangeTimer ? (
          <CellChangeTimer changeTime={changeTime} />
        ) : (
          <CellCountDown
            departureDateObj={departureDateObj}
            hasDeparted={hasDeparted}
          />
        )}
        <CellDestination
          destination={trainDetails.destination[0]}
          subsequentCallingPoints={
            trainDetails.subsequentCallingPoints &&
            trainDetails.subsequentCallingPoints[0]
          }
          fromTo={fromTo}
        />
      </div>
    );
  }

  let delayedtimeArrivalDestination = trainDetails.subsequentCallingPoints
    ? trainDetails.subsequentCallingPoints[0].callingPoint.filter(
        (station) => station.crs === fromTo.to
      )[0]?.et
    : "";
  if (
    delayedtimeArrivalDestination === "On time" ||
    delayedtimeArrivalDestination === "Delayed"
  ) {
    delayedtimeArrivalDestination =
      trainDetails.subsequentCallingPoints[0].callingPoint.filter(
        (station) => station.crs === fromTo.to
      )[0].st;
  }
  if (!isTimeFormat(delayedtimeArrivalDestination))
    delayedtimeArrivalDestination = "";

  return (
    <div
      className={`flex flex-col ${
        isDelayed
          ? `bg-background-delayed`
          : isCancelled
          ? `bg-background-cancelled`
          : ""
      } `}
    >
      <div className="flex flex-row gap-1 items-center py-3">
        <div className="w-3"></div>
        <CellTime
          timeArrivalDestination={delayedtimeArrivalDestination}
          isDelayed={isDelayed}
          isCancelled={isCancelled}
          std={trainDetails.std}
          etd={trainDetails.etd}
        />
        <CellPlatform
          platform={trainDetails.platform}
          isCancelled={isCancelled}
        />
        <CellCountDown isCancelledOrDelayed={!isOnTime} />
        <CellDestination
          destination={trainDetails.destination[0]}
          subsequentCallingPoints={
            trainDetails.subsequentCallingPoints &&
            trainDetails.subsequentCallingPoints[0]
          }
          fromTo={fromTo}
        />
      </div>
      <div className="flex items-center text-[7pt] -mt-3 leading-3 p-1 italic text-text-highlight border-b-4 border-dotted border-border-notic border-collapse">
        {(trainDetails.delayReason || trainDetails.cancelReason) && (
          <>
            <RailwayAlertIcon className="text-text-highlight px-1" />
            <div>{trainDetails.cancelReason || trainDetails.delayReason}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrainRowContainer;
