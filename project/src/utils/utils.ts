import { INITIAL_GENRE } from '../const';
import { IMovieDataAdapted } from '../common/types';

export const formatMovieRunTime = (minutes: number): string => {
  const date = new Date(minutes * 60000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();

  if (hh) {
    return `${hh}h ${mm}m`;
  }
  return `${mm}m`;
};

export const formatPlayerTime = (seconds: number): string => {
  if (seconds === 0) {
    return '00:00';
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, '0');

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }
  return `${mm}:${ss}`;
};

export const defineRatingDescription = (rating: number): string => {
  switch (true) {
    case rating <= 3:
      return 'Bad';
    case rating < 5:
      return 'Normal';
    case rating < 8:
      return 'Good';
    case rating < 10:
      return 'Very good';
    default:
      return 'Awesome';
  }
};

export const prepareGenresList = (
  moviesData: IMovieDataAdapted[],
): string[] => {
  const uniqueGenres = Array.from(
    new Set(moviesData.map((movie) => movie.genre)),
  );
  return [INITIAL_GENRE, ...uniqueGenres].slice(0, 11);
};

export const getMovieFavoritesStatusForUrl = (isFavorite: boolean): number =>
  isFavorite ? 0 : 1;
