import React from "react";

import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

type TCellPlatform = {
  platform: string | null;
  isCancelled: boolean;
};
const CellPlatform = ({ platform, isCancelled }: TCellPlatform) => {
  return (
    <div
      className={`basis-1/6 flex flex-col items-center p-2 ${
        !platform ? "bg-transparent text-slate-600" : "bg-blue-900 text-white"
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
