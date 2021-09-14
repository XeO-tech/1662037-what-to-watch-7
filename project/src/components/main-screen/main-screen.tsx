import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GenresList from '../genres-list/genres-list';
import Header from '../header/header';
import Spinner from '../spinner/spinner';
import { useFetchPromoMovieQuery } from '../../features/api/api-slice';
import { AppRoute } from '../../const';

export default function MainScreen(): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const {
    data: promoMovieData,
    isFetching,
    isError,
  } = useFetchPromoMovieQuery();

  if (isFetching) {
    return <Spinner />;
  }

  if (isError || !promoMovieData) {
    return <p>Could not load data from server. Try again later</p>;
  }

  const onCardHover = (filmId: number): void => {
    setActiveCard(filmId);
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
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width={19} height={20}>
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <GenresList onCardHover={onCardHover}/>
        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <div className="copyright">
            <p>© 2021 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
