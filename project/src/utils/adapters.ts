import { IMovieDataAdapted, IMovieDataRaw, IAuthDataAdapted, IAuthdataRaw} from '../common/types';

export const adaptMovieDataToClient = (film: IMovieDataRaw): IMovieDataAdapted => {
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

export const adaptAuthDataToClient = (authData: IAuthdataRaw): IAuthDataAdapted => {
  const adaptedAuthData = Object.assign(
    {},
    authData,
    {avatarUrl: authData['avatar_url'] as string},
  );
  delete adaptedAuthData['avatar_url'];
  return adaptedAuthData;
};
