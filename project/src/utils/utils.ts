export const convertRunTimeMinutesToHours = (runTime: number): string => {
  const hours = Math.floor(runTime/60);
  let minutes : number | string = runTime % 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
};
