import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenresList from '../genres-list/genres-list';
import Header from '../header/header';
import Footer from '../footer/footer';
import Spinner from '../spinner/spinner';
import { useFetchMoviesQuery, useFetchPromoMovieQuery, usePostToFavoritesMutation } from '../../features/api/api-slice';
import { useAppSelector } from '../../app/hooks';
import { getMovieFavoritesStatusForUrl } from '../../utils/utils';
import { AuthStatus, AppRoute } from '../../const';


export default function MainScreen(): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isPromoFavorite, setIsPromoFavorite] = useState(false);
  const isAuthentificated = useAppSelector((state) => state.auth.status) === AuthStatus.AUTH;

  const {
    data: promoMovieData,
    isFetching: isPromoMovieDataFetching,
    isError: isPromoMovieDataFetchError,
  } = useFetchPromoMovieQuery();

  const {
    data: moviesData = [],
    isFetching: isMovieDataFetching,
    isError: isMoviesDataFetchError,
  } = useFetchMoviesQuery();

  const [postToFavorites] = usePostToFavoritesMutation();

  useEffect(() => {
    if (promoMovieData) {
      setIsPromoFavorite(promoMovieData.isFavorite);
    }
  }, [promoMovieData]);

  if (isPromoMovieDataFetching || isMovieDataFetching) {
    return <Spinner />;
  }

  if (isPromoMovieDataFetchError || isMoviesDataFetchError || !promoMovieData || !moviesData) {
    return <p>Could not load data from server. Try again later</p>;
  }

  const onCardHover = (filmId: number): void => {
    setActiveCard(filmId);
  };

  const onMyListButtonClick = () => {
    postToFavorites({id: String(promoMovieData.id), status: getMovieFavoritesStatusForUrl(isPromoFavorite)})
      .unwrap()
      .then(() => setIsPromoFavorite(!isPromoFavorite))
      .catch(() => toast.error('Couldn\'t add movie to favorite list. Try again later.', {
        position: toast.POSITION.TOP_LEFT,
      }));
  };

  return (
    <div>
      <ToastContainer />
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoMovieData.backgroundImage} alt='Promo movie background' />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header />
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <Link to={AppRoute.FILM.replace(/:id\/:tabName/, String(promoMovieData.id))}>
                <img src={promoMovieData.backgroundImage} alt={`${promoMovieData.name} poster`} width={218} height={327} />
              </Link>
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{promoMovieData.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoMovieData.genre}</span>
                <span className="film-card__year">{promoMovieData.released}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                {isAuthentificated &&
                  <button onClick={onMyListButtonClick} className="btn btn--list film-card__button" type="button">
                    <svg viewBox="0 0 19 20" width={19} height={20}>
                      <use href={isPromoFavorite ? '#in-list': '#add'} />
                    </svg>
                    <span>My list</span>
                  </button>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <GenresList onCardHover={onCardHover} moviesData={moviesData}/>
        <Footer />
      </div>
    </div>
  );
}
