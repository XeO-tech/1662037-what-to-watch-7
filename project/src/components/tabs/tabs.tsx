import React from 'react';
import { Route, Switch, Redirect, useParams, useRouteMatch, Link } from 'react-router-dom';
import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';
import { IMovieDataAdapted } from '../../common/types';
import { useFetchMovieCommentsQuery } from '../../features/api/api-slice';
import { AppRoute } from '../../const';

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
    isSuccess: isCommentsFetchSuccess,
    isError: isCommentsFetchError,
  } = useFetchMovieCommentsQuery(id);

  const TabAlias = ['Overview', 'Details', 'Reviews'];

  if (tabName !== undefined && TabAlias.map((alias) => alias.toLowerCase()).every((element) => element !== tabName)) {
    return <Redirect to={'/page-not-found'} />;
  }

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {
            TabAlias.map((tabAlias) => {
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
        <Route exact path={`${path}/details`}>
          <DetailsTab movieData={movieData}/>
        </Route>
        <Route exact path={`${path}/reviews`}>
          <ReviewsTab commentsData={commentsData} isCommentsFetchSuccess={isCommentsFetchSuccess} isCommentsFetchError={isCommentsFetchError} />
        </Route>
        <Route exact path={`${path}`}>
          <OverviewTab movieData={movieData} />
        </Route>
      </Switch>
    </div>
  );
}


