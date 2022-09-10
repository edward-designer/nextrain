import React from "react";
import useStateStorage from "./Hooks/useStateStorage";

import TrainContext from "./Context/TrainContext";

import ThemeWrapper from "./Components/ThemeWrapper/ThemeWrapper";
import InputForm from "./Components/InputForm";
import TrainList from "./Components/TrainList";

import { ReactComponent as Logo } from "./nextrains.svg";

import { convertArrToFromToObject } from "./Utils/helpers";

const App = () => {
  const { fromToArr, ...others } = useStateStorage();
  const { returnArr, direct } = convertArrToFromToObject(fromToArr);

  return (
    <ThemeWrapper>
      <div className="max-w-7xl mx-auto relative">
        <TrainContext>
          <Logo className="-mt-6 relative ml-2 fill-text-tertiary max-w-[40%]" />
          <InputForm fromToArr={fromToArr} {...others} />
          {returnArr.map((item, inx) => (
            <TrainList
              key={`${item.from}-${item.to}`}
              fromTo={item}
              direct={direct && inx === 0}
            />
          ))}
        </TrainContext>
      </div>
    </ThemeWrapper>
  );
};

export default App;
