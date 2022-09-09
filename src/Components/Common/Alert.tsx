import React, { useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";

import Button from "../Button";

type PropsType = {
  message: string | null;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  type?: "Error" | "Notice";
};

const Alert = ({ message, setShowAlert, type = "Error" }: PropsType) => {
  let timeOutId: ReturnType<typeof setTimeout>;
  useEffect(() => {
    timeOutId = setTimeout(() => setShowAlert(false), 10000);
    return () => clearTimeout(timeOutId);
  }, []);

  return (
    <div
      className={`flex justify-center items-center ${
        type === "Error" ? "bg-background-cancelled" : "bg-background-notice"
      }`}
      role="alert"
    >
      <div
        className={`flex-1 text-xs border-l-4 px-4 py-2 ${
          type === "Error"
            ? "border-text-highlight text-text-highlight"
            : "border-accent-color text-accent-color"
        }`}
      >
        <p className="font-bold">{type}</p>
        <p>{message}</p>
      </div>
      <Button
        customStyle={`${
          type === "Error" ? "bg-background-cancelled" : "bg-background-notice"
        }`}
        ariaLabel="close the error message"
        clickHandler={() => setShowAlert(false)}
      >
        <ClearIcon />
      </Button>
    </div>
  );
};

export default Alert;