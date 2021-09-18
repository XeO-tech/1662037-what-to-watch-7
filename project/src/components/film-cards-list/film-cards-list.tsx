import * as React from 'react';
import Card from '../card/card';
import { IMovieDataAdapted } from '../../common/types';

type Props = {
  cardNumbers: number,
  moviesData: IMovieDataAdapted[],
  onCardHover: (arg0: number) => void;
}

export default function FilmCardsList(props: Props): JSX.Element {
  const {cardNumbers, moviesData, onCardHover} = props;

  if (moviesData.length === 0) {
    return <p>No movies found<br /></p>;
  }

  return (
    <div className="catalog__films-list">
      {moviesData.slice(0, cardNumbers).map((film) => <Card key={film.id} movieData={film} onCardHover={() => onCardHover(film.id)}/>)}
    </div>
  );
}
