import React from "react";
import useStateStorage from "./Hooks/useStateStorage";

import ThemeWrapper from "./Components/ThemeWrapper/ThemeWrapper";
import InputForm from "./Components/InputForm";
import TrainList from "./Components/TrainList";

import { convertArrToFromToObject } from "./Utils/helpers";

const App = () => {
  const { fromToArr, ...others } = useStateStorage();
  const fromToWithInterchange = convertArrToFromToObject(fromToArr);

  return (
    <div className="max-w-xs mx-auto relative">
      <ThemeWrapper>
        <InputForm fromToArr={fromToArr} {...others} />
        {fromToWithInterchange.map((item) => (
          <TrainList key={`${item.from}-${item.to}`} fromTo={item} />
        ))}
      </ThemeWrapper>
    </div>
  );
};

export default App;
