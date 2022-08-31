import React from "react";

type TCellTime = {
  std: string;
  etd: string;
  timeArrivalDestination?: string | null;
  isCancelled?: boolean;
  isDelayed?: boolean;
};

const CellTime = ({
  std,
  etd,
  timeArrivalDestination = null,
  isCancelled = false,
  isDelayed = false,
}: TCellTime) => {
  /* minor delay is not shown as official delay but has a later etd */
  const isMinorDelayed = etd !== "On time" && etd !== "Delayed";

  const updatedDepartureTime = isMinorDelayed ? etd : std;

  return (
    <div
      className={`basis-2/12 flex flex-row items-center font-medium leading-4 pl-1 gap-2 ${
        isDelayed || isCancelled || isMinorDelayed ? "text-text-highlight" : ""
      }`}
    >
      <div className="flex flex-col flex-1">
        {(isMinorDelayed || isDelayed) && (
          <span className="line-through text-[10px]">
            <span>{std}</span>
          </span>
        )}

        {!isDelayed && !isCancelled ? (
          /*in case of minor delay, shows the new etd*/
          <span>
            <span>{updatedDepartureTime}</span>
          </span>
        ) : (
          /*or just the word "Delayed" or in case of cancel "Cancelled"*/
          (isDelayed || isCancelled) && (
            <span className={"text-[8px] font-bold"}>{etd}</span>
          )
        )}

        {timeArrivalDestination && (
          <span className="text-[10px] block text-right leading-3 text-text-tertiary">
            {`→ ${timeArrivalDestination}`}
          </span>
        )}
      </div>
    </div>
  );
};

export default CellTime;
