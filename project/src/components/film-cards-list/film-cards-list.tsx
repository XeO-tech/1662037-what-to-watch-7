import * as React from 'react';
import Card from '../card/card';
import { IFilmDataAdapted } from '../../common/types';

type Props = {
  cardNumbers: number,
  filmsData: IFilmDataAdapted[],
}

export default function FilmCardsList(props: Props): JSX.Element {
  const {cardNumbers, filmsData} = props;

  return (
    <div className="catalog__films-list">
      {filmsData.slice(0, cardNumbers - 1).map((film) => <Card key={film.id} filmData={film} />)}
    </div>
  );
}
