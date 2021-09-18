import * as React from 'react';
import { useState } from 'react';
import FilmCardsList from '../film-cards-list/film-cards-list';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useFetchFavoritesMoviesQuery } from '../../features/api/api-slice';
import { CARDS_NUMBER } from '../../const';


export default function MyListScreen(): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const {
    data: favoriteMovies = [],
  } = useFetchFavoritesMoviesQuery();

  const onCardHover = (filmId: number): void => {
    setActiveCard(filmId);
  };

  return (
    <div className="user-page">
      <Header />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmCardsList moviesData={favoriteMovies} cardNumbers={CARDS_NUMBER} onCardHover={onCardHover}/>
      </section>
      <Footer />
    </div>
  );
}
