import { TFromTo } from "../Types/types";

export const currentTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const currentDayofWeek = () => new Date().getDay() + 1;

export const convertArrToFromToObject = (arr: string[]): TFromTo[] => {
  let returnArr: TFromTo[] = [];
  const filteredArr = arr.filter(Boolean);
  const arrCount = filteredArr.length;
  if (arrCount > 1) {
    filteredArr.forEach((item: string, ind: number) => {
      if (ind < arrCount - 1)
        returnArr.push({ from: item, to: filteredArr[ind + 1] });
    });
  }
  if (arrCount >= 3) {
    returnArr.unshift({ from: arr[0], to: arr.at(-1) as string });
  }
  return returnArr;
};
