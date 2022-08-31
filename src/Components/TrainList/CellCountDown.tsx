import React from "react";
import ReactTimeAgo from "react-time-ago";
const { round } = require("javascript-time-ago/steps");

console.log(round);
type TCellCountDown = {
  departureDateObj?: Date | null;
  hasDeparted?: boolean;
  isCancelledOrDelayed?: boolean;
};

const CellCountDown = ({
  departureDateObj = null,
  hasDeparted = false,
  isCancelledOrDelayed = false,
}: TCellCountDown) => {
  return (
    <div className="basis-1/12 flex relative items-center justify-center -translate-x-2">
      {!isCancelledOrDelayed && !hasDeparted && (
        <span className="animate-ping absolute w-6 h-6 rounded-full bg-background-countdown opacity-50"></span>
      )}
      {departureDateObj && (
        <ReactTimeAgo
          className={`absolute w-8 h-8 bg-background-countdown opacity-80 rounded-full text-[9px] text-center leading-8 text-text-countdown ${
            hasDeparted ? "text-text-inactive bg-background-inactive" : ""
          }`}
          timeStyle={{ labels: ["custom", "mini"], steps: round }}
          locale="en"
          date={departureDateObj}
          future
        />
      )}
    </div>
  );
};

export default CellCountDown;
