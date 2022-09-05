import React from "react";
import { TrainStatus } from "../../Types/types";

type TCellTime = {
  std: string;
  arrivalTime: string | null;
  arrivalTimeDestination: string | null;
  status: TrainStatus;
};

const CellTime = ({
  std,
  arrivalTime,
  arrivalTimeDestination,
  status,
}: TCellTime) => {
  if (status === TrainStatus.cancelled) arrivalTime = "Cancelled";
  if (status === TrainStatus.delayed) arrivalTime = "Delayed";
  return (
    <div
      className={`basis-2/12 flex flex-row items-center font-medium leading-4 pl-1 gap-2 
      ${
        status !== TrainStatus.ontime && status !== TrainStatus.departed
          ? "text-text-highlight"
          : ""
      }
     ${
       status === TrainStatus.cancelled || status === TrainStatus.delayed
         ? "basis-4/12"
         : ""
     }
        `}
    >
      <div className="flex flex-col flex-1">
        {arrivalTime !== std && (
          <span className="line-through text-[10px]">
            <span>{std}</span>
          </span>
        )}

        <span>
          <span>{arrivalTime}</span>
        </span>

        {arrivalTimeDestination &&
          !(
            status === TrainStatus.delayed || status === TrainStatus.cancelled
          ) && (
            <span
              className={`text-[10px] block text-right leading-3 text-text-tertiary`}
            >
              {`→ ${arrivalTimeDestination}`}
            </span>
          )}
      </div>
    </div>
  );
};

export default CellTime;
