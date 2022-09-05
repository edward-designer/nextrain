import React from "react";

import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { TrainStatus } from "../../Types/types";

type TCellPlatform = {
  platform: string | null;
  status: TrainStatus;
};
const CellPlatform = ({ platform, status }: TCellPlatform) => {
  if (status === TrainStatus.cancelled || status === TrainStatus.delayed)
    return null;
  return (
    <div
      className={`basis-2/12 flex flex-col items-center p-2 ${
        !platform
          ? "bg-transparent text-text-inactive"
          : status === TrainStatus.departed
          ? "bg-background-inactive text-text-inactive"
          : "bg-accent-color text-reverse-color"
      }`}
    >
      {platform ? (
        <>
          <span className="text-[9px] text-center leading-3">Platform</span>
          <span className="text-2xl text-center leading-6">{platform}</span>
        </>
      ) : (
        <HourglassEmptyIcon />
      )}
    </div>
  );
};

export default CellPlatform;
