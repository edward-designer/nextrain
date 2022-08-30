export const currentTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const currentDayofWeek = () => new Date().getDay() + 1;
