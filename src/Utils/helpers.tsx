import { TFromTo } from "../Types/types";

export const currentTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const currentDayofWeek = () => new Date().getDay() + 1;

export const isNextDay = (time: string) => {
  const [hour] = time.split(":");
  return Number(new Date().getHours()) - parseInt(hour) > 12;
};

export const convertArrToFromToObject = (
  arr: string[]
): { returnArr: TFromTo[]; direct: boolean } => {
  let returnArr: TFromTo[] = [];
  let direct = false;
  const filteredArr = arr.filter(Boolean);
  const arrCount = filteredArr.length;
  if (arrCount > 1) {
    filteredArr.forEach((item: string, ind: number) => {
      if (ind < arrCount - 1)
        returnArr.push({ from: item, to: filteredArr[ind + 1] });
    });
  } else {
    returnArr.push({ from: arr[0], to: arr.at(-1) as string });
  }
  if (arrCount >= 3) {
    returnArr.unshift({ from: arr[0], to: arr.at(-1) as string });
    direct = true;
  }
  return { returnArr, direct };
};

export const isTime1LaterThanTime2 = (
  time1: string | null,
  time2: string | null
): boolean => {
  if (time1 === null || time2 === null) return false;
  if (!(isTimeFormat(time1) && isTimeFormat(time2))) return false;
  const [hour1] = time1.split(":");
  const [hour2] = time2.split(":");
  if (parseInt(hour1) - parseInt(hour2) > 12) {
    return false;
  } else if (parseInt(hour2) - parseInt(hour1) > 12) {
    return true;
  }
  return time1 > time2;
};

export const isTimeFormat = (time: string | null): boolean => {
  if (time === null) return false;
  return /^\d{2}:\d{2}$/.test(time);
};

export const minutesDifference = (
  timeArrival: string,
  timeDeparture: string
): string | null => {
  if (!(isTimeFormat(timeArrival) && isTimeFormat(timeDeparture))) return null;
  const date1 = new Date();
  const [hour1, minute1] = timeArrival.split(":");
  date1.setHours(parseInt(hour1));
  date1.setMinutes(parseInt(minute1));
  date1.setSeconds(0);
  const date2 = new Date();
  const [hour2, minute2] = timeDeparture.split(":");
  if (isNextDay(timeDeparture)) {
    date2.setHours(parseInt(hour2) + 12);
  } else {
    date2.setHours(parseInt(hour2));
  }
  date2.setMinutes(parseInt(minute2));
  date2.setSeconds(0);
  const changeTime = Math.floor(
    (date2.valueOf() - date1.valueOf()) / (1000 * 60)
  );

  return changeTime > 60 ? ">1h" : `${changeTime}m`;
};
