import React from "react";
import SyncIcon from "@mui/icons-material/Sync";
import TrainIcon from "@mui/icons-material/Train";

import useTrainInfo from "../../Hooks/useTrainInfo";

import TrainListContainer from "./TrainListContainer";
import Notice from "../Notice";
import Loading from "../Common/Loading";
import Error from "../Common/Error";
import Button from "../Button";

import { TFromTo } from "../../Types/types";

type TTrainList = {
  fromTo: TFromTo;
};

const TrainList = ({ fromTo }: TTrainList) => {
  const { response, error, loading, refetch } = useTrainInfo(fromTo);

  return (
    <div className="shadow-md">
      {fromTo.from && (
        <div className="flex items-center text-text-secondary bg-background-title">
          <h2 className="flex-1 text-lg pl-2">
            <TrainIcon />
            {` ${fromTo.from} → ${fromTo.to}`}
          </h2>
          <Button clickHandler={refetch} customStyle="bg-background-title">
            <SyncIcon />
          </Button>
        </div>
      )}
      <Error error={error} />
      <Notice fromStation={fromTo.from} />
      <div className="flex flex-col relative divide-y divide-text-inactive">
        {loading && <Loading />}
        <TrainListContainer fromTo={fromTo} response={response} />
      </div>
    </div>
  );
};

export default TrainList;
