import React from 'react';
import { IMovieDataAdapted } from '../../common/types';
import { convertRunTimeMinutesToHours } from '../../utils/utils';
import { RunTimeFormat } from '../../const';


export default function DetailsTab({movieData}: {movieData: IMovieDataAdapted}): JSX.Element {

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{movieData.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {movieData.starring.map((star, ind) => (
              <React.Fragment key={star}>
                {star}{ind === (movieData.starring.length - 1) ? '' : ','} <br />
              </React.Fragment>
            ))}
          </span>
        </p>
      </div>
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{convertRunTimeMinutesToHours(movieData.runTime, RunTimeFormat.NUMBERS_AND_LETTERS)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{movieData.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{movieData.released}</span>
        </p>
      </div>
    </div>
  );
}
