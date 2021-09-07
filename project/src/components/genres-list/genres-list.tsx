import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setGenre } from '../../features/genres/genres-slice';
import FilmCardsList from '../film-cards-list/film-cards-list';
import { Genre } from '../../const';
import { GenreValuesType } from '../../common/types';

const CARD_NUMBERS = 8;

export default function GenresList({onCardHover}: {onCardHover:(arg0: number) => void}): JSX.Element {

  const currentGenre = useAppSelector((state) => state.genre.currentGenre);

  const filmsData = useAppSelector((state) => {
    if (state.genre.currentGenre === Genre.ALL) {
      return state.movies.moviesList;
    }
    return state.movies.moviesList.filter((movie) => movie.genre === state.genre.currentGenre);
  });

  const dispatch = useAppDispatch();

  const onGenreClick = (e: React.MouseEvent<HTMLElement>): void => {
    const targetElement = e.target as HTMLElement;
    dispatch(setGenre(targetElement.textContent as GenreValuesType));
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <ul className="catalog__genres-list">
        {Object.values(Genre).map((genre) => (
          <li key={genre} className={`catalog__genres-item ${currentGenre === genre ? 'catalog__genres-item--active': ''}`}>
            <div
              style={{cursor: 'pointer'}}
              className="catalog__genres-link"
              onClick={onGenreClick}
            >
              {genre}
            </div>
          </li>
        ))}
      </ul>
      <FilmCardsList cardNumbers={CARD_NUMBERS} filmsData={filmsData} onCardHover={onCardHover}/>
      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
}
