import React from 'react';
import { IMovieDataAdapted } from '../../common/types';
import { defineRatingDescription } from '../../utils/utils';

export default function OverviewTab({
  movieData,
}: {
  movieData: IMovieDataAdapted;
}): JSX.Element {
  return (
    <>
      <div className='film-rating'>
        <div className='film-rating__score'>{movieData.rating}</div>
        <p className='film-rating__meta'>
          <span className='film-rating__level'>
            {defineRatingDescription(movieData.rating)}
          </span>
          <span className='film-rating__count'>
            {movieData.scoresCount} ratings
          </span>
        </p>
      </div>
      <div className='film-card__text'>
        <p>{movieData.description}</p>
        <p className='film-card__director'>
          <strong>Director: {movieData.director}</strong>
        </p>
        <p className='film-card__starring'>
          <strong>Starring: {movieData.starring.join(', ')} and other</strong>
        </p>
      </div>
    </>
  );
}
