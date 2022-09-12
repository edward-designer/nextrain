import React from "react";
import useStateStorage from "./Hooks/useStateStorage";

import TrainContext from "./Context/TrainContext";

import ThemeWrapper from "./Components/ThemeWrapper/ThemeWrapper";
import InputForm from "./Components/InputForm";
import TrainList from "./Components/TrainList";

import { ReactComponent as Logo } from "./nextrains.svg";
import NRE from "./NRE_Powered_logo.png";

import { convertArrToFromToObject } from "./Utils/helpers";

const App = () => {
  const { fromToArr, ...others } = useStateStorage();
  const { returnArr, destination } = convertArrToFromToObject(fromToArr);

  return (
    <ThemeWrapper>
      <TrainContext>
        <div className="max-w-7xl mx-auto relative">
          <Logo className="-mt-6 relative ml-2 fill-text-tertiary max-w-[40%]" />
          <InputForm fromToArr={fromToArr} {...others} />
          {returnArr.map((item, inx) => (
            <TrainList
              key={`${item.from}-${item.to}`}
              fromTo={item}
              destination={
                inx === 0 && returnArr.length === 2 ? destination : ""
              }
            />
          ))}
          <div className="pt-2 flex flex-row-reverse">
            <img className="max-w-[160px]" src={NRE} alt="powered by NRE" />
          </div>
        </div>
      </TrainContext>
    </ThemeWrapper>
  );
};

export default App;
