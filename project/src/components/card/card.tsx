import React from 'react';
import { IFilmDataAdapted } from '../../common/types';

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
        <a className="small-film-card__link" href="film-page.html">{filmData.name}</a>
      </h3>
    </article>);
}
