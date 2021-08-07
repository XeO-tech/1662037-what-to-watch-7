interface IFilmInput {
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

interface IFilmOutput {
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

export const adaptFilmToClient = (film: IFilmInput): IFilmOutput => {
  const adaptedFilm = Object.assign(
    {},
    film,
    {
      posterImage: film['poster_image'] as string,
      previewImage: film['preview_image'] as string,
      backgroundImage: film['background_image'] as string,
      backgroundColor: film['background_color'] as string,
      scoresCount: film['scores_count'] as number,
      runTime: film['run_time'] as number,
      isFavorite: film['is_favorite'] as boolean,
      videoLink: film['video_link'] as string,
      previewVideoLink: film['preview_video_link'] as string,
    },
  );

  delete adaptedFilm['poster_image'];
  delete adaptedFilm['preview_image'];
  delete adaptedFilm['background_image'];
  delete adaptedFilm['background_color'];
  delete adaptedFilm['scores_count'];
  delete adaptedFilm['run_time'];
  delete adaptedFilm['is_favorite'];
  delete adaptedFilm['video_link'];
  delete adaptedFilm['preview_video_link'];

  return adaptedFilm;
};
