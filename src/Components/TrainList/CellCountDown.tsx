import React from "react";
import ReactTimeAgo from "react-time-ago";
const { round } = require("javascript-time-ago/steps");

type TCellCountDown = {
  departureDateObj: Date;
  isDeparted: boolean;
};

const CellCountDown = ({ departureDateObj, isDeparted }: TCellCountDown) => {
  return (
    <div className="basis-1/12 flex relative items-center justify-center -translate-x-2">
      {!isDeparted && (
        <span className="animate-ping absolute  w-6 h-6 rounded-full bg-blue-400 opacity-30"></span>
      )}
      <ReactTimeAgo
        className={`absolute w-8 h-8 bg-blue-300/80 rounded-full text-[9px] text-center leading-8 text-blue-900 ${
          isDeparted && "bg-slate-200/80 text-slate-400"
        }`}
        timeStyle={{ labels: ["custom", "mini"], steps: round }}
        locale="en"
        date={departureDateObj}
        future
      />
    </div>
  );
};

export default CellCountDown;
