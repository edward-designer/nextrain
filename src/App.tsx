import React from "react";
import useStateStorage from "./Hooks/useStateStorage";
import TrainContext from "./Context/TrainContext";

import ThemeWrapper from "./Components/ThemeWrapper/ThemeWrapper";
import InputForm from "./Components/InputForm";
import TrainListWrapper from "./Components/TrainListWrapper";
import Acknowledgement from "./Components/Acknowledgement";

import { ReactComponent as Logo } from "./nextrains.svg";

const App = () => {
  const { fromToArr, ...others } = useStateStorage();

  return (
    <ThemeWrapper>
      <TrainContext>
        <div className="max-w-7xl mx-auto relative">
          <Logo className="-mt-6 relative ml-2 fill-text-tertiary max-w-[40%]" />
          <InputForm fromToArr={fromToArr} {...others} />
          <TrainListWrapper fromToArr={fromToArr} />
          <Acknowledgement />
        </div>
      </TrainContext>
    </ThemeWrapper>
  );
};

export default App;
