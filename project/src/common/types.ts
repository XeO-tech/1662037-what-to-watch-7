export interface IMovieDataAdapted {
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  id: number;
  isFavorite: boolean;
  videoLink: string;
  previewVideoLink: string;
}

export interface IMovieDataRaw {
  name: string;
  'poster_image'?: string;
  'preview_image'?: string;
  'background_image'?: string;
  'background_color'?: string;
  description: string;
  rating: number;
  'scores_count'?: number;
  director: string;
  starring: string[];
  'run_time'?: number;
  genre: string;
  released: number;
  id: number;
  'is_favorite'?: boolean;
  'video_link'?: string;
  'preview_video_link'?: string;
}

export interface IAuthdataRaw {
  id: number;
  email: string;
  name: string;
  'avatar_url'?: string;
  token: string;
}

export interface IAuthDataAdapted {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
  token: string;
}

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ICommentData {
  id: number;
  user: {
    id: number;
    name: string;
  };
  rating: number;
  comment: string;
  date: string;
}

export interface ICommentFormData {
  rating: string;
  comment: string;
}
