import { RunTimeFormat, INITIAL_GENRE } from '../const';
import { IMovieDataAdapted } from '../common/types';

type RunTimeFormatValuesType = typeof RunTimeFormat[keyof typeof RunTimeFormat]

export const convertRunTimeMinutesToHours = (runTime: number, format: RunTimeFormatValuesType): string => {
  const hours = Math.floor(runTime/60);
  let minutes : number | string = runTime % 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  switch (format) {
    case RunTimeFormat.NUMBERS:
      return `${hours}:${minutes}`;
    case RunTimeFormat.NUMBERS_AND_LETTERS:
      return `${hours}h ${minutes}m`;
    default:
      return '0';
  }
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

export const prepareGenresList = (moviesData: IMovieDataAdapted[]): string[] => {
  const uniqueGenres = Array.from(new Set(moviesData.map((movie) => movie.genre)));
  return [INITIAL_GENRE, ...uniqueGenres].slice(0,11);
};

export const getMovieFavoritesStatusForUrl = (isFavorite: boolean): number => isFavorite ? 0 : 1;

