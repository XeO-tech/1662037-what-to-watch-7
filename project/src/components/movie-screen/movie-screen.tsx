import React, { useState, useEffect } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabs from '../tabs/tabs';
import MoviesCardsList from '../movies-cards-list/movies-cards-list';
import Header from '../header/header';
import Footer from '../footer/footer';
import Spinner from '../spinner/spinner';
import {
  useFetchMovieQuery,
  useFetchSimilarMoviesQuery,
  usePostToFavoritesMutation,
} from '../../features/api/api-slice';
import { useAppSelector } from '../../app/hooks';
import { getMovieFavoritesStatusForUrl } from '../../utils/utils';
import { SIMILAR_MOVIES_NUMBER, AuthStatus, AppRoute } from '../../const';

export default function MovieScreen(): JSX.Element {
  const { id }: { id: string } = useParams();
  const isAuthentificated =
    useAppSelector((state) => state.auth.status) === AuthStatus.AUTH;
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    data: movieData,
    isFetching: isMovieDataFetching,
    isError: isMovieDataFetchError,
    error: movieDataFetchError = {},
  } = useFetchMovieQuery(id);

  const {
    data: similarMoviesData = [],
    isSuccess: isSimilarMovieDataFetchSuccess,
  } = useFetchSimilarMoviesQuery(id);

  useEffect(() => {
    if (movieData) {
      setIsFavorite(movieData.isFavorite);
    }
  }, [movieData]);

  const [postToFavorites] = usePostToFavoritesMutation();

  const filteredSimilarMoviesData = similarMoviesData.filter(
    (similarMovieData) => similarMovieData.id !== Number(id),
  );

  if (isMovieDataFetching) {
    return <Spinner />;
  }

  if (isMovieDataFetchError || !movieData) {
    if ('status' in movieDataFetchError) {
      if (movieDataFetchError.status === 404) {
        return <Redirect to={'/movie-not-found'} />;
      }
    }
    return <p>Could not load data from server. Try again later</p>;
  }

  const onAddToMyListButtonClick = () => {
    postToFavorites({ id, status: getMovieFavoritesStatusForUrl(isFavorite) })
      .unwrap()
      .then(() => setIsFavorite(!isFavorite))
      .catch(() =>
        toast.error('Could not add movie to favorite list. Try again later.', {
          position: toast.POSITION.TOP_LEFT,
        }),
      );
  };

  return (
    <div>
      <ToastContainer />
      <section className='film-card film-card--full'>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={movieData.backgroundImage} alt={movieData.name} />
          </div>
          <h1 className='visually-hidden'>WTW</h1>
          <Header />
          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{movieData.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{movieData.genre}</span>
                <span className='film-card__year'>{movieData.released}</span>
              </p>
              <div className='film-card__buttons'>
                <Link
                  to={AppRoute.PLAYER.replace(/:id/, id)}
                  className='btn btn--play film-card__button'
                  type='button'
                >
                  <svg viewBox='0 0 19 19' width={19} height={19}>
                    <use xlinkHref='#play-s' />
                  </svg>
                  <span>Play</span>
                </Link>

                {isAuthentificated && (
                  <button
                    onClick={onAddToMyListButtonClick}
                    className='btn btn--list film-card__button'
                    type='button'
                  >
                    <svg viewBox='0 0 19 20' width={19} height={20}>
                      <use href={isFavorite ? '#in-list' : '#add'} />
                    </svg>
                    <span>My list</span>
                  </button>
                )}
                <Link
                  to={AppRoute.REVIEW.replace(/:id/, id)}
                  className='btn film-card__button'
                >
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='film-card__wrap film-card__translate-top'>
          <div className='film-card__info'>
            <div className='film-card__poster film-card__poster--big'>
              <img
                src={movieData.posterImage}
                alt={`${movieData.name} poster`}
                width={218}
                height={327}
              />
            </div>
            <Tabs movieData={movieData} />
          </div>
        </div>
      </section>
      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>
          {isSimilarMovieDataFetchSuccess &&
          filteredSimilarMoviesData.length === 0 ? (
            'No similar movies found'
          ) : (
            <MoviesCardsList
              cardNumbers={SIMILAR_MOVIES_NUMBER}
              moviesData={filteredSimilarMoviesData}
              onCardHover={() => void 0}
            />
          )}
        </section>
        <Footer />
      </div>
    </div>
  );
}
