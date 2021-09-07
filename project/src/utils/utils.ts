import { RunTimeFormat } from '../const';

type RunTimeFormatValuesType = typeof RunTimeFormat[keyof typeof RunTimeFormat]

export const convertRunTimeMinutesToHours = (runTime: number, format: RunTimeFormatValuesType): string => {

  const hours = Math.floor(runTime/60);
  let minutes : number | string = runTime % 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  const result = (format === RunTimeFormat.NUMBERS) ?
    `${hours}:${minutes}` :
    `${hours}h ${minutes}m`;
  return result;
};

export const defineRatingDescription = (rating: number): string => {
  switch (true) {
    case (rating <= 3):
      return 'Bad';
    case (rating < 5):
      return 'Normal';
    case (rating < 8):
      return 'Good';
    case (rating < 10):
      return 'Very good';
    default:
      return 'Awesome';
  }
};
