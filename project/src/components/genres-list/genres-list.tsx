import * as React from 'react';
import { useAppSelector } from '../../app/hooks';
import FilmCardsList from '../film-cards-list/film-cards-list';

const CARD_NUMBERS = 8;

export default function GenresList({onCardHover}: {onCardHover:(arg0: number) => void}): JSX.Element {

  const currentGenre = useAppSelector((state) => state.genre.currentGenre);
  const filmsData = useAppSelector((state) => state.movies.moviesList);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <ul className="catalog__genres-list">
        <li className="catalog__genres-item catalog__genres-item--active">
          <a href='foo' className="catalog__genres-link" >All genres</a>
        </li>
        <li className="catalog__genres-item">
          <a href='foo' className="catalog__genres-link">Comedies</a>
        </li>
        <li className="catalog__genres-item">
          <a href='foo' className="catalog__genres-link">Crime</a>
        </li>
        <li className="catalog__genres-item">
          <a href='foo' className="catalog__genres-link">Documentary</a>
        </li>
        <li className="catalog__genres-item">
          <a href='foo' className="catalog__genres-link">Dramas</a>
        </li>
        <li className="catalog__genres-item">
          <a href='foo' className="catalog__genres-link">Horror</a>
        </li>
        <li className="catalog__genres-item">
          <a href='foo' className="catalog__genres-link">Kids &amp; Family</a>
        </li>
        <li className="catalog__genres-item">
          <a href='foo' className="catalog__genres-link">Romance</a>
        </li>
        <li className="catalog__genres-item">
          <a href='foo' className="catalog__genres-link">Sci-Fi</a>
        </li>
        <li className="catalog__genres-item">
          <a href='foo' className="catalog__genres-link">Thrillers</a>
        </li>
      </ul>
      <FilmCardsList cardNumbers={CARD_NUMBERS} filmsData={filmsData} onCardHover={onCardHover}/>
      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
}
