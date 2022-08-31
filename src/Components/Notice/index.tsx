import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { currentTime, currentDayofWeek } from "../../Utils/helpers";

type TCheckPeakHours = {
  dateOfWeek: number;
  time: string;
  fromStation: string | null;
};

const londonStations = ["PAD", "KGX", "WAT", "VIC"];
const checkPeakHours = ({ dateOfWeek, time, fromStation }: TCheckPeakHours) => {
  return (
    dateOfWeek <= 5 &&
    ((time <= "09:30" && time >= "06:30") ||
      (time >= "16:00" &&
        time <= "19:00" &&
        fromStation &&
        londonStations.includes(fromStation)))
  );
};

const Notice = ({ fromStation }: { fromStation: string | null }) => {
  const time = currentTime();
  const dateOfWeek = currentDayofWeek();
  const isPeakHour = checkPeakHours({ dateOfWeek, time, fromStation });

  return (
    <div className="bg-background-notice text-text-notice" role="alert">
      {isPeakHour ? (
        <p className="text-[10px]  px-4 py-3">
          <ErrorOutlineIcon className="text-text-notice-icon" /> Off-peak
          tickets may not be eligible to travel [
          <a
            href="https://www.nationalrail.co.uk/times_fares/ticket_types/off-peak-tickets.aspx"
            target="_blank"
            rel="noreferrer"
            className="font-bold underline hover:text-hover-color"
          >
            check
          </a>
          ]
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notice;
