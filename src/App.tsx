import React from "react";
import useStateStorage from "./Hooks/useStateStorage";

import ThemeWrapper from "./Components/ThemeWrapper/ThemeWrapper";
import InputForm from "./Components/InputForm";
import TrainList from "./Components/TrainList";

const App = () => {
  const { fromTo, ...others } = useStateStorage();

  return (
    <div className="max-w-xs mx-auto relative">
      <ThemeWrapper>
        <InputForm fromTo={fromTo} {...others} />
        <TrainList fromTo={fromTo} />
      </ThemeWrapper>
    </div>
  );
};

export default App;
