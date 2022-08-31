import { useState, useEffect } from "react";
import axios from "axios";

import { TFromTo, TTrainInfo } from "../Types/types";

const useTrainInfo = ({ from, to }: TFromTo) => {
  const [response, setResponse] = useState<TTrainInfo[] | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTrainInfo = () => {
    if (from !== "") {
      setLoading(true);
      const apiTo = to ? `/to/${to}` : "";
      const trainApi = `https://huxley2.azurewebsites.net/departures/${from}${apiTo}/20?accessToken=${process.env.REACT_APP_accessToken}&expand=true&timeWindow=120`;
      axios
        .get(trainApi)
        .then((response) => {
          console.log(response.data.trainServices);
          let trainServices = response.data.trainServices;

          setResponse(trainServices);
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const refetch = () => {
    fetchTrainInfo();
  };

  useEffect(() => {
    fetchTrainInfo();
  }, [from, to]);

  return { response, error, loading, refetch };
};

export default useTrainInfo;
