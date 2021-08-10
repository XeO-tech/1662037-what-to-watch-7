import React from 'react';
import { Link } from 'react-router-dom';
import { IFilmDataAdapted } from '../../common/types';
import { AppRoute } from '../../const';

type Props = {
  filmData: IFilmDataAdapted,
  onCardHover: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function Card(props: Props): JSX.Element {
  const {filmData, onCardHover} = props;

  return (
    <article onMouseEnter={onCardHover} className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={filmData.previewImage} alt={filmData.name} width={280} height={175} />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.FILM.replace(/:id/, String(filmData.id))}>{filmData.name}</Link>
      </h3>
    </article>);
}
