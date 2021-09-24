export const CARDS_NUMBER = 8;

export const SIMILAR_FILMS_NUMBER = 4;

export const INITIAL_GENRE = 'All genres';

export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  MY_LIST: '/mylist',
  FILM: '/films/:id',
  REVIEW: '/films/:id/review',
  PLAYER: '/player/:id',
  TEST: '/test',
};

export const RunTimeFormat  = {
  NUMBERS: 'num',
  NUMBERS_AND_LETTERS: 'numAndLetters',
} as const;

export const Genre = {
  ALL: 'All genres',
  COMEDIES: 'Comedies',
  CRIME: 'Crime',
  DOCUMENTARY: 'Documentary',
  DRAMAS: 'Dramas',
  HORROR: 'Horror',
  KIDS_AND_FAMILY: 'Kids & Family',
  ROMANCE: 'Romance',
  SCIFI: 'Sci-Fi',
  THRILLERS: 'Thrillers',
} as const;

export const AuthStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
} as const;
