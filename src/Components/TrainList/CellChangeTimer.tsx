import React from "react";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";

type TCellChangeTimer = {
  changeTime: string | null;
};

const CellChangeTimer = ({ changeTime }: TCellChangeTimer) => {
  return (
    <div className="basis-1/12 flex relative items-center justify-center -translate-x-2">
      {changeTime && (
        <div className="absolute w-8 h-8 bg-hover-color opacity-80 text-[9px] text-center leading-8 text-reverse-color">
          <TransferWithinAStationIcon
            sx={{ marginLeft: "0px", marginRight: "0px", fontSize: "12px" }}
          />
          {changeTime}
        </div>
      )}
    </div>
  );
};

export default CellChangeTimer;
