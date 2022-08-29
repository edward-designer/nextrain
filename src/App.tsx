import React from "react";
import useStateStorage from "./Hooks/useStateStorage";

import InputForm from "./Components/InputForm";
import TrainList from "./Components/TrainList";

const App = () => {
  const { fromTo, ...others } = useStateStorage();

  return (
    <div className="max-w-xs mx-auto ">
      <InputForm fromTo={fromTo} {...others} />
      <TrainList fromTo={fromTo} />
    </div>
  );
};

export default App;
