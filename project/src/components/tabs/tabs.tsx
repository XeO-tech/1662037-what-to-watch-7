import React from 'react';
import { Route, Switch, Redirect, useParams, useRouteMatch, Link, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { IMovieDataAdapted } from '../../common/types';
import { defineRatingDescription, convertRunTimeMinutesToHours } from '../../utils/utils';
import { useFetchMovieCommentsQuery } from '../../features/api/api-slice';
import { RunTimeFormat, AppRoute } from '../../const';

type Props = {
  movieData: IMovieDataAdapted,
  id: string,
}
export default function Tabs (props: Props): JSX.Element {
  const {movieData, id } = props;
  const {path} = useRouteMatch();
  const {tabName}: {tabName : string} = useParams();

  const {
    data: commentsData = [],
    isSuccess,
    isError,
  } = useFetchMovieCommentsQuery(id);


  const overviewTab = (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{movieData.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{defineRatingDescription(movieData.rating)}</span>
          <span className="film-rating__count">{movieData.scoresCount}</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{movieData.description}</p>
        <p className="film-card__director"><strong>Director: {movieData.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {movieData.starring.join(', ')} and other</strong></p>
      </div>
    </>
  );

  const detailsTab = (
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

  const reviewsTab = (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">

        {isError && <p>Couldn&apos;t load comments. Please, try refreshing the page.</p>}

        {(isSuccess && commentsData.length === 0) && <p>No comments yet.</p>}

        {isSuccess && commentsData.map((comment) => (
          <div key={comment.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>
              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime={comment.date}>{dayjs(comment.date).format('MMMM DD, YYYY')}</time>
              </footer>
            </blockquote>
            <div className="review__rating">{comment.rating}</div>
          </div>
        ))}

      </div>
    </div>
  );

  const TabAlias: {[key: string]: JSX.Element} = {
    Overview: overviewTab,
    Details: detailsTab,
    Reviews: reviewsTab,
  };

  if (tabName !== undefined && Object.keys(TabAlias).map((alias) => alias.toLowerCase()).every((element) => element !== tabName)) {
    return <Redirect to={'/page-not-found'} />;
  }

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {
            Object.keys(TabAlias).map((tabAlias) => {
              const isTabActive = (tabName === undefined && tabAlias === 'Overview') || tabName === tabAlias.toLowerCase();

              const tabLink = (tabAlias === 'Overview') ? '' : `/${tabAlias.toLowerCase()}`;

              return (
                <li
                  key={tabAlias}
                  className={`film-nav__item ${isTabActive && 'film-nav__item--active'}`}
                >
                  <Link
                    to={AppRoute.FILM.replace(/:id\/:tabName/, `${id}${tabLink}`)}
                    className="film-nav__link"
                  >
                    {tabAlias}
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </nav>
      <Switch>
        <Route exact path={`${path}/details`}>{detailsTab}</Route>
        <Route exact path={`${path}/reviews`}>{reviewsTab}</Route>
        <Route exact path={`${path}`}>{overviewTab}</Route>
      </Switch>
    </div>
  );
}


