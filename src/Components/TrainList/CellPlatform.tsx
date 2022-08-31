import React from "react";

import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

type TCellPlatform = {
  platform: string | null;
  isCancelled?: boolean;
  hasDeparted?: boolean;
};
const CellPlatform = ({
  platform,
  isCancelled = false,
  hasDeparted = false,
}: TCellPlatform) => {
  return (
    <div
      className={`basis-2/12 flex flex-col items-center p-2 ${
        !platform
          ? "bg-transparent text-text-inactive"
          : hasDeparted
          ? "bg-background-inactive text-text-inactive"
          : "bg-accent-color text-reverse-color"
      }`}
    >
      {platform ? (
        <>
          <span className="text-[9px] text-center leading-3">Platform</span>
          <span className="text-2xl text-center leading-6">{platform}</span>
        </>
      ) : isCancelled ? (
        <RailwayAlertIcon />
      ) : (
        <HourglassEmptyIcon />
      )}
    </div>
  );
};

export default CellPlatform;
