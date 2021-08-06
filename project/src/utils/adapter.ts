interface IFilm {
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

export const adaptFilmToClient = (film: IFilm): IFilm => {
  const adaptedFilm = Object.assign(
    {},
    film,
    {
      posterImage: film['poster_image'],
      previewImage: film['preview_image'],
      backgroundImage: film['background_image'],
      backgroundColor: film['background_color'],
      scoresCount: film['scores_count'],
      runTime: film['run_time'],
      isFavorite: film['is_favorite'],
      videoLink: film['video_link'],
      previewVideoLink: film['preview_video_link'],
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
