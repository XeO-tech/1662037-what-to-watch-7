import React from 'react';
import { Route, Switch, Redirect, useParams, useRouteMatch, useLocation, Link } from 'react-router-dom';
import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';
import { IMovieDataAdapted } from '../../common/types';

type Props = {
  movieData: IMovieDataAdapted,
}

export default function Tabs (props: Props): JSX.Element {
  const {movieData} = props;
  const {path, url} = useRouteMatch();
  const {tabName}: {tabName : string} = useParams();
  const location = useLocation();
  const currentTab = location.pathname.slice(location.pathname.lastIndexOf('/')+1)
  console.log(currentTab);

  const TabAlias = ['Overview', 'Details', 'Reviews'];

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
                    to={`${url}${tabLink}`}
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
      <Route path={`${path}/:tabName?`}>
        <Switch>
          <Route exact path={`${path}/details`}>
            <DetailsTab movieData={movieData}/>
          </Route>
          <Route exact path={`${path}/reviews`}>
            <ReviewsTab  />
          </Route>
          <Route exact path={`${path}`}>
            <OverviewTab movieData={movieData} />
          </Route>
          <Route path='*'>
            <Redirect to={'/page-not-found'} />
          </Route>
        </Switch>
      </Route>
    </div>
  );
}


