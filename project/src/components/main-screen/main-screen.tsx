import React from 'react';
import { useState } from 'react';
import GenresList from '../genres-list/genres-list';
import Header from '../header/header';
import Footer from '../footer/footer';
import Spinner from '../spinner/spinner';
import { useFetchPromoMovieQuery, usePostToFavoritesMutation } from '../../features/api/api-slice';
import { useAppSelector } from '../../app/hooks';
import { getMovieFavoritesStatusForUrl } from '../../utils/utils';
import { AuthStatus } from '../../const';


export default function MainScreen(): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const isAuthentificated = useAppSelector((state) => state.auth.status) === AuthStatus.AUTH;

  const {
    data: promoMovieData,
    isFetching,
    isError,
  } = useFetchPromoMovieQuery();

  const [postToFavorites] = usePostToFavoritesMutation();

  if (isFetching) {
    return <Spinner />;
  }

  if (isError || !promoMovieData) {
    return <p>Could not load data from server. Try again later</p>;
  }

  const onCardHover = (filmId: number): void => {
    setActiveCard(filmId);
  };

  const onAddToMyListButtonClick = () => {
    postToFavorites({id: String(promoMovieData.id), status: getMovieFavoritesStatusForUrl(promoMovieData.isFavorite)});
  };

  return (
    <div>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoMovieData.backgroundImage} alt='Promo movie background' />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header />
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoMovieData.backgroundImage} alt={`${promoMovieData.name} poster`} width={218} height={327} />
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
                  <button onClick={onAddToMyListButtonClick} className="btn btn--list film-card__button" type="button">
                    <svg viewBox="0 0 19 20" width={19} height={20}>
                      <use href={promoMovieData.isFavorite ? '#in-list': '#add'} />
                    </svg>
                    <span>My list</span>
                  </button>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <GenresList onCardHover={onCardHover}/>
        <Footer />
      </div>
    </div>
  );
}
