import React, { useState } from 'react';
import FilmCardsList from '../film-cards-list/film-cards-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import { prepareGenresList } from '../../utils/utils';
import { IMovieDataAdapted } from '../../common/types';
import { CARDS_NUMBER, INITIAL_GENRE } from '../../const';

type Props = {
  onCardHover: (arg0: number) => void;
  moviesData: IMovieDataAdapted[];
};

export default function GenresList(props: Props): JSX.Element {
  const { onCardHover, moviesData } = props;
  const [currentGenre, setCurrentGenre] = useState(INITIAL_GENRE);
  const genresList = prepareGenresList(moviesData);

  const selectMoviesDataByGenre = (data: IMovieDataAdapted[]) => {
    if (currentGenre === INITIAL_GENRE) {
      return data;
    }
    return data.filter((movie) => movie.genre === currentGenre);
  };

  const filteredMoviesData = selectMoviesDataByGenre(moviesData);

  const initialShowedMoviesNumber =
    filteredMoviesData.length < CARDS_NUMBER
      ? filteredMoviesData.length
      : CARDS_NUMBER;

  const [showedMoviesNumber, setShowedMoviesNumber] = useState(
    initialShowedMoviesNumber,
  );

  const isShowMoreButtonVisible =
    showedMoviesNumber < filteredMoviesData.length;

  const onGenreClick = (e: React.MouseEvent<HTMLElement>): void => {
    const targetElement = e.target as HTMLElement;
    setShowedMoviesNumber(CARDS_NUMBER);
    setCurrentGenre(targetElement.textContent as string);
  };

  const onShowMoreClick = (): void => {
    filteredMoviesData.length - showedMoviesNumber > CARDS_NUMBER
      ? setShowedMoviesNumber(showedMoviesNumber + CARDS_NUMBER)
      : setShowedMoviesNumber(filteredMoviesData.length);
  };

  return (
    <section className='catalog'>
      <h2 className='catalog__title visually-hidden'>Catalog</h2>
      <ul className='catalog__genres-list'>
        {genresList.map((genre) => (
          <li
            key={genre}
            className={`catalog__genres-item ${
              currentGenre === genre ? 'catalog__genres-item--active' : ''
            }`}
          >
            <div
              style={{ cursor: 'pointer' }}
              className='catalog__genres-link'
              onClick={onGenreClick}
            >
              {genre}
            </div>
          </li>
        ))}
      </ul>
      <FilmCardsList
        cardNumbers={showedMoviesNumber}
        moviesData={filteredMoviesData}
        onCardHover={onCardHover}
      />
      {isShowMoreButtonVisible && (
        <ShowMoreButton onShowMoreClick={onShowMoreClick} />
      )}
    </section>
  );
}
