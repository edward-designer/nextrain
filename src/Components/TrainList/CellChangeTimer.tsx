import React from "react";
import AlarmIcon from "@mui/icons-material/Alarm";

type TCellChangeTimer = {
  changeTime: string | null;
};

const CellChangeTimer = ({ changeTime }: TCellChangeTimer) => {
  return (
    <div className="flex relative items-center justify-center -translate-x-8 translate-y-2 -mr-5">
      {changeTime && (
        <div
          className="absolute w-9 h-4 bg-hover-color opacity-80 text-[9px] text-center leading-4 text-reverse-color
         after:border-l-hover-color after:absolute after:left-[100%] after:top-0 after:w-0 after:h-0 after:border-t-8 after:border-l-6 after:border-b-8 after:border-t-transparent after:border-b-transparent"
        >
          <AlarmIcon sx={{ fontSize: "10px" }} />
          {changeTime}
        </div>
      )}
    </div>
  );
};

export default CellChangeTimer;
