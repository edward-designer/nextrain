import CellPlatform from "./CellPlatform";
import CellCountDown from "./CellCountDown";
import CellChangeTimer from "./CellChangeTimer";

import { TrainStatus } from "../../Types/types";

type TCellPlatformTimerContainer = {
  status: TrainStatus;
  platform: string;
  isConnecting: boolean;
  toPlatform: string;
  changeTime: string | null;
  departureDateObj: Date | undefined;
  isRunning: boolean;
};
const CellPlatformTimerContainer = ({
  status,
  platform,
  isConnecting,
  toPlatform,
  changeTime,
  departureDateObj,
  isRunning,
}: TCellPlatformTimerContainer) => {
  const isDirect = platform === toPlatform;
  return (
    <div
      className={`flex flex-row justify-center ${
        isRunning || status === TrainStatus.departed
          ? "basis-3/12 "
          : "basis-1/12 "
      }`}
    >
      {isConnecting ? (
        isDirect ? (
          <CellPlatform status={status} platform={platform} />
        ) : (
          <>
            <CellPlatform status={status} toPlatform={toPlatform} />
            <CellChangeTimer changeTime={changeTime} />
            <CellPlatform status={status} platform={platform} isConnecting={isConnecting}/>
          </>
        )
      ) : (
        <>
          <CellPlatform status={status} platform={platform} />
          <CellCountDown
            departureDateObj={departureDateObj}
            isRunning={isRunning}
          />
        </>
      )}
    </div>
  );
};

export default CellPlatformTimerContainer;
