import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { checkPeakHours } from "../../Utils/helpers";

const Notice = ({ fromStation }: { fromStation: string | null }) => {
  const isPeakHour = checkPeakHours(fromStation);
  return (
    <div className="bg-background-notice text-text-notice" role="alert">
      {isPeakHour ? (
        <p className="text-[10px]  px-4 py-3" data-testId="peakHour">
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
