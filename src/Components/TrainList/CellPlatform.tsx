import React from "react";

import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { TrainStatus } from "../../Types/types";

type TCellPlatform = {
  platform?: string | null;
  status: TrainStatus;
  toPlatform?: string | null;
};
const CellPlatform = ({
  platform = "",
  status,
  toPlatform = null,
}: TCellPlatform) => {
  if (status === TrainStatus.cancelled || status === TrainStatus.delayed)
    return null;
  return (
    <div
      className={`basis-1/4 flex flex-col items-center p-2 ${
        platform || toPlatform
          ? status === TrainStatus.departed
            ? "bg-background-inactive text-text-inactive"
            : platform
            ? "bg-accent-color text-reverse-color"
            : "bg-text-notice-icon text-reverse-color scale-50 -translate-x-2 -translate-y-3"
          : toPlatform !== null
          ? "bg-transparent text-text-inactive scale-75 -translate-x-3 -translate-y-2"
          : "bg-transparent text-text-inactive"
      }`}
    >
      {toPlatform || platform ? (
        <>
          <span className="text-[9px] text-center leading-3">Platform</span>
          <span className="text-2xl text-center leading-6">
            {toPlatform || platform}
          </span>
        </>
      ) : (
        <HourglassEmptyIcon />
      )}
    </div>
  );
};

export default CellPlatform;
