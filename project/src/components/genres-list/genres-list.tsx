import React, {useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setGenre } from '../../features/genres/genres-slice';
import FilmCardsList from '../film-cards-list/film-cards-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import { Genre } from '../../const';
import { GenreValuesType } from '../../common/types';
import { useFetchMoviesQueryState } from '../../features/api/api-slice';
import { IMovieDataAdapted } from '../../common/types';
import { CARD_NUMBERS } from '../../const';


export default function GenresList({onCardHover}: {onCardHover:(arg0: number) => void}): JSX.Element {

  const { data: moviesData = []} = useFetchMoviesQueryState();
  const currentGenre = useAppSelector((state) => state.genre.currentGenre);

  const dispatch = useAppDispatch();

  const selectMoviesDataByGenre = (data: IMovieDataAdapted[]) => {
    if (currentGenre === Genre.ALL) {
      return data;
    }
    return data.filter((movie) => movie.genre === currentGenre);
  };

  const filteredMoviesData = selectMoviesDataByGenre(moviesData);

  const initialShowedMoviesNumber = (filteredMoviesData.length < CARD_NUMBERS) ? filteredMoviesData.length : CARD_NUMBERS;

  const [showedMoviesNumber, setShowedMoviesNumber] = useState(initialShowedMoviesNumber);

  const isButtonVisible = showedMoviesNumber < filteredMoviesData.length;

  const onGenreClick = (e: React.MouseEvent<HTMLElement>): void => {
    const targetElement = e.target as HTMLElement;
    setShowedMoviesNumber(CARD_NUMBERS);
    dispatch(setGenre(targetElement.textContent as GenreValuesType));
  };

  const onShowMoreClick = (): void => {
    (filteredMoviesData.length - showedMoviesNumber > CARD_NUMBERS) ? setShowedMoviesNumber(showedMoviesNumber + CARD_NUMBERS) : setShowedMoviesNumber(filteredMoviesData.length);
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
      <FilmCardsList cardNumbers={showedMoviesNumber} filmsData={filteredMoviesData} onCardHover={onCardHover}/>
      {isButtonVisible && <ShowMoreButton onShowMoreClick={onShowMoreClick} />}
    </section>
  );
}
