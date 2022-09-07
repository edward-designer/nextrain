import React from "react";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

type TCellChangeTimer = {
  changeTime: string | null;
};

const CellChangeTimer = ({ changeTime }: TCellChangeTimer) => {
  return (
    <div className="basis-1/12 flex relative items-center justify-center -translate-x-2">
      {changeTime && (
        <div className="absolute w-8 h-8 bg-hover-color opacity-80 text-[9px] text-center leading-8 text-reverse-color">
          <HourglassTopIcon
            sx={{ marginLeft: "-4px", marginRight: "-2px", fontSize: "14px" }}
          />
          {changeTime}
        </div>
      )}
    </div>
  );
};

export default CellChangeTimer;
