import React from "react";

import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

type TCellPlatform = {
  platform: string | null;
  isCancelled: boolean;
  isDeparted: boolean;
};
const CellPlatform = ({ platform, isCancelled, isDeparted }: TCellPlatform) => {
  return (
    <div
      className={`basis-2/12 flex flex-col items-center p-2 ${
        !platform
          ? "bg-transparent text-slate-600"
          : isDeparted
          ? "bg-slate-300 text-slate-400"
          : "bg-blue-900 text-white"
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
