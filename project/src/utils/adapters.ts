import {
  IMovieDataAdapted,
  IMovieDataRaw,
  IAuthDataAdapted,
  IAuthdataRaw,
} from '../common/types';

export const adaptMovieDataToClient = (
  movieData: IMovieDataRaw,
): IMovieDataAdapted => {
  const adaptedMovieData = Object.assign({}, movieData, {
    posterImage: movieData['poster_image'] as string,
    previewImage: movieData['preview_image'] as string,
    backgroundImage: movieData['background_image'] as string,
    backgroundColor: movieData['background_color'] as string,
    scoresCount: movieData['scores_count'] as number,
    runTime: movieData['run_time'] as number,
    isFavorite: movieData['is_favorite'] as boolean,
    videoLink: movieData['video_link'] as string,
    previewVideoLink: movieData['preview_video_link'] as string,
  });
  delete adaptedMovieData['poster_image'];
  delete adaptedMovieData['preview_image'];
  delete adaptedMovieData['background_image'];
  delete adaptedMovieData['background_color'];
  delete adaptedMovieData['scores_count'];
  delete adaptedMovieData['run_time'];
  delete adaptedMovieData['is_favorite'];
  delete adaptedMovieData['video_link'];
  delete adaptedMovieData['preview_video_link'];

  return adaptedMovieData;
};

export const adaptAuthDataToClient = (
  authData: IAuthdataRaw,
): IAuthDataAdapted => {
  const adaptedAuthData = Object.assign({}, authData, {
    avatarUrl: authData['avatar_url'] as string,
  });
  delete adaptedAuthData['avatar_url'];

  return adaptedAuthData;
};
