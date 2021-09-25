import { INITIAL_GENRE } from '../const';
import { IMovieDataAdapted } from '../common/types';

export const convertRunTimeMinutesToHours = (runTime: number): string => {
  const hours = Math.floor(runTime/60);
  let minutes : number | string = runTime % 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}h ${minutes}m`;
};

export const defineRemainingTime = (runTime: number, elapsedTime: number): string => {
  const remainingSeconds = runTime * 60 - elapsedTime;
  let hours: number | string = Math.floor(remainingSeconds/3600);
  let minutes: number | string = Math.floor(remainingSeconds/60) % 60;
  let seconds: number | string = remainingSeconds % 60;

  switch (true) {
    case (hours === 0):
      hours = '';
      break;
    case (hours < 10):
      hours = `0${hours}:`;
      break;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${hours}${minutes}:${seconds}`;
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

