import { Genre } from '../const';

export interface IMovieDataAdapted {
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  backgroundColor: string,
  description: string,
  rating: number,
  scoresCount: number,
  director: string,
  starring: string[],
  runTime: number,
  genre: string,
  released: number,
  id: number,
  isFavorite: boolean,
  videoLink: string,
  previewVideoLink: string
}

export interface IMovieDataRaw {
  name: string,
  'poster_image'?: string,
  'preview_image'?: string,
  'background_image'?: string,
  'background_color'?: string,
  description: string,
  rating: number,
  'scores_count'?: number,
  director: string,
  starring: string[],
  'run_time'?: number,
  genre: string,
  released: number,
  id: number,
  'is_favorite'?: boolean,
  'video_link'?: string,
  'preview_video_link'?: string
}

export type GenreValuesType = typeof Genre[keyof typeof Genre];
