import React from "react";

type TCellTime = {
  std: string;
  etd: string;
  timeArrivalDestination: string;
  isCancelled: boolean;
  isDelayed: boolean;
};
const CellTime = ({
  std,
  etd,
  timeArrivalDestination,
  isCancelled,
  isDelayed,
}: TCellTime) => {
  return (
    <div
      className={`basis-1/6 flex flex-col font-medium leading-4 pl-1 ${
        isDelayed || isCancelled ? "text-red-900" : ""
      }`}
    >
      <span className={isDelayed ? "line-through text-[10px]" : ""}>
        <span>{std}</span>
      </span>

      {/*etd may show the new departure time*/}
      {isDelayed && etd !== "Delayed" && <span>{etd}</span>}
      {/*or just the word "Delayed"*/}
      {(etd === "Delayed" || isCancelled) && (
        <span className={"text-[8px] font-bold"}>{etd}</span>
      )}

      {timeArrivalDestination && (
        <span className="text-[10px] block text-right leading-3 text-slate-500">
          {`→ ${timeArrivalDestination}`}
        </span>
      )}
    </div>
  );
};

export default CellTime;
