import * as React from 'react';
import { useState } from 'react';
import FilmCardsList from '../film-cards-list/film-cards-list';
import Footer from '../footer/footer';
import { IMovieDataAdapted } from '../../common/types';
import { CARDS_NUMBER } from '../../const';

type Props = {
  filmsData: IMovieDataAdapted[],
}

export default function MyListScreen({filmsData}: Props): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const onCardHover = (filmId: number): void => {
    setActiveCard(filmId);
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="main.html" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>
        <h1 className="page-title user-page__title">My list</h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width={63} height={63} />
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link" href='foo'>Sign out</a>
          </li>
        </ul>
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          <FilmCardsList filmsData={filmsData} cardNumbers={CARDS_NUMBER} onCardHover={onCardHover}/>
        </div>
      </section>
      <Footer />
    </div>
  );
}
