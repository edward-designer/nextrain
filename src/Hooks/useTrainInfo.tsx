import { useState, useEffect } from "react";
import axios from "axios";

import { TFromToType, TTrainInfo } from "../Types/types";

const useTrainInfo = ({ from, to }: TFromToType) => {
  const [response, setResponse] = useState<TTrainInfo[] | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTrainInfo = () => {
    if (from !== "") {
      setLoading(true);
      const apiTo = to ? `/to/${to}` : "";
      const trainApi = `https://huxley.apphb.com/departures/${from}${apiTo}/?accessToken=${process.env.REACT_APP_accessToken}&expand=true`;
      axios
        .get(trainApi)
        .then((response) => {
          console.log(response.data.trainServices);
          setResponse(response.data.trainServices);
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
