import React, {useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setGenre } from '../../features/genres/genres-slice';
import FilmCardsList from '../film-cards-list/film-cards-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import { Genre } from '../../const';
import { GenreValuesType } from '../../common/types';

const CARD_NUMBERS = 8;

export default function GenresList({onCardHover}: {onCardHover:(arg0: number) => void}): JSX.Element {

  const currentGenre = useAppSelector((state) => state.genre.currentGenre);

  const moviesData = useAppSelector((state) => {
    if (state.genre.currentGenre === Genre.ALL) {
      return state.movies.moviesList;
    }
    return state.movies.moviesList.filter((movie) => movie.genre === state.genre.currentGenre);
  });

  const initialShowedMoviesNumber = (moviesData.length < CARD_NUMBERS) ? moviesData.length : CARD_NUMBERS;

  const [showedMoviesNumber, setShowedMoviesNumber] = useState(initialShowedMoviesNumber);

  const isButtonVisible = showedMoviesNumber !== moviesData.length && moviesData.length !== 0;

  const dispatch = useAppDispatch();

  const onGenreClick = (e: React.MouseEvent<HTMLElement>): void => {
    const targetElement = e.target as HTMLElement;
    setShowedMoviesNumber(CARD_NUMBERS);
    dispatch(setGenre(targetElement.textContent as GenreValuesType));
  };

  const onShowMoreClick = (): void => {
    (moviesData.length - showedMoviesNumber > CARD_NUMBERS) ? setShowedMoviesNumber(showedMoviesNumber + CARD_NUMBERS) : setShowedMoviesNumber(moviesData.length);
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
      <FilmCardsList cardNumbers={showedMoviesNumber} filmsData={moviesData} onCardHover={onCardHover}/>
      {isButtonVisible && <ShowMoreButton onShowMoreClick={onShowMoreClick} />}
    </section>
  );
}
