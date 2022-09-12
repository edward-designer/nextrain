import React, { useState, useContext, useEffect } from "react";
import SyncIcon from "@mui/icons-material/Sync";
import TrainIcon from "@mui/icons-material/Train";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import { SelectedTrainContext } from "../../Context/TrainContext";

import useTrainInfo from "../../Hooks/useTrainInfo";

import TrainListContainer from "./TrainListContainer";
import Notice from "../Notice";
import Loading from "../Common/Loading";
import Alert from "../Common/Alert";
import Button from "../Button";

import { TFromTo } from "../../Types/types";

import { minutesFromNow } from "../../Utils/helpers";

type TTrainList = {
  fromTo: TFromTo;
  destination: string;
};

const TrainList = ({ fromTo, destination }: TTrainList) => {
  const { toTime, toStation } = useContext(SelectedTrainContext);
  const timeFrom =
    toTime && fromTo.from === toStation ? minutesFromNow(toTime) : 0;
  const { response, error, notice, loading, refetch } = useTrainInfo(
    fromTo,
    timeFrom,
    destination
  );
  const [showAlert, setShowAlert] = useState(error !== "");

  const toggleAlert = () => {
    setShowAlert((showAlert) => !showAlert);
  };

  useEffect(() => refetch(timeFrom), [timeFrom, refetch]);
  return (
    <div className="shadow-md">
      {fromTo.from && (
        <div className="sticky top-0 z-50 flex items-center text-text-secondary bg-background-title border-b border-background-main">
          <h2 className="flex-1 text-lg pl-2">
            <TrainIcon />
            {` ${fromTo.from} → ${fromTo.to}`}
          </h2>
          {notice?.length !== 0 && (
            <Button
              clickHandler={toggleAlert}
              customStyle="bg-background-title"
              ariaLabel="show ntoices"
            >
              <ReportProblemIcon />
            </Button>
          )}
          <Button
            clickHandler={() => refetch()}
            customStyle="bg-background-title"
            ariaLabel="update train data"
          >
            <SyncIcon />
          </Button>
        </div>
      )}

      {error !== "" && showAlert && (
        <Alert message={error} setShowAlert={setShowAlert} type="Error" />
      )}
      {notice &&
        showAlert &&
        notice.map((noticeItem, inx) => (
          <Alert
            key={`${fromTo.from}${fromTo.to}${inx}`}
            message={noticeItem.value}
            setShowAlert={setShowAlert}
            type="Notice"
          />
        ))}
      <Notice fromStation={fromTo.from} />
      <div className="flex flex-col relative">
        {loading && <Loading />}
        <TrainListContainer fromTo={fromTo} response={response} />
      </div>
    </div>
  );
};

export default TrainList;
