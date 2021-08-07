import React from 'react';
import { IFilmDataAdapted } from '../../common/types';

type Props = {
  filmData: IFilmDataAdapted,
}

export default function Card({filmData}: Props): JSX.Element {

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={filmData.previewImage} alt={filmData.name} width={280} height={175} />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{filmData.name}</a>
      </h3>
    </article>);
}
