import React, { useState, useContext, useEffect } from "react";
import SyncIcon from "@mui/icons-material/Sync";
import TrainIcon from "@mui/icons-material/Train";
import CloseFullscreenOutlinedIcon from "@mui/icons-material/CloseFullscreenOutlined";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";

import { SelectedTrainContext } from "../../Context/TrainContext";

import useTrainInfo from "../../Hooks/useTrainInfo";

import TrainListContainer from "./TrainListContainer";
import Notice from "../Notice";
import Loading from "../Common/Loading";
import Error from "../Common/Error";
import Button from "../Button";

import { TFromTo } from "../../Types/types";

import { minutesFromNow } from "../../Utils/helpers";

type TTrainList = {
  fromTo: TFromTo;
  direct: boolean;
};

const TrainList = ({ fromTo, direct }: TTrainList) => {
  const { toTime, toStation } = useContext(SelectedTrainContext);
  const timeFrom =
    toTime && fromTo.from === toStation ? minutesFromNow(toTime) : 0;
  const { response, error, loading, refetch } = useTrainInfo(fromTo, timeFrom);
  const [isTabOpen, setIsTabOpen] = useState(true);

  const toggleTab = () => {
    setIsTabOpen((isTabOpen) => !isTabOpen);
  };

  useEffect(() => refetch(timeFrom), [timeFrom]);

  return (
    <div className="shadow-md">
      {fromTo.from && (
        <div className="flex items-center text-text-secondary bg-background-title border-b border-background-main">
          <h2 className="flex-1 text-lg pl-2">
            <TrainIcon />
            {` ${fromTo.from} → ${fromTo.to}`}
            {direct && <span className="text-[10px]"> (Direct)</span>}
          </h2>
          <Button
            clickHandler={toggleTab}
            customStyle="bg-background-title"
            ariaLabel={isTabOpen ? `minimize the tab` : `maximize the tab`}
          >
            {isTabOpen ? (
              <CloseFullscreenOutlinedIcon />
            ) : (
              <ZoomOutMapOutlinedIcon />
            )}
          </Button>
          <Button
            clickHandler={() => refetch()}
            customStyle="bg-background-title"
            ariaLabel="update train data"
          >
            <SyncIcon />
          </Button>
        </div>
      )}
      {isTabOpen && (
        <>
          <Error error={error} />
          <Notice fromStation={fromTo.from} />
          <div className="flex flex-col relative">
            {loading && <Loading />}
            <TrainListContainer fromTo={fromTo} response={response} />
          </div>
        </>
      )}
    </div>
  );
};

export default TrainList;
