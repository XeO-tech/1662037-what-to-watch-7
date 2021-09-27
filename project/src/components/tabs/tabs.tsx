import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useParams,
  useRouteMatch,
  useLocation,
  Link,
} from 'react-router-dom';
import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';
import { IMovieDataAdapted } from '../../common/types';

type Props = {
  movieData: IMovieDataAdapted;
};

export default function Tabs(props: Props): JSX.Element {
  const { movieData } = props;
  const { path, url } = useRouteMatch();
  const { id }: { id: string } = useParams();
  const { pathname } = useLocation();

  const Tab = {
    OVERVIEW: 'overview',
    DETAILS: 'details',
    REVIEWS: 'reviews',
  };

  const defineCurrentTab = () => {
    const pathEnd = pathname.slice(pathname.lastIndexOf('/') + 1);
    return pathEnd === id ? Tab.OVERVIEW : pathEnd;
  };

  const currentTab = defineCurrentTab();

  return (
    <div className='film-card__desc'>
      <nav className='film-nav film-card__nav'>
        <ul className='film-nav__list'>
          {Object.values(Tab).map((tabName) => {
            const tabLink = tabName === Tab.OVERVIEW ? '' : `/${tabName}`;
            const tabNameCapitalized =
              tabName.slice(0, 1).toUpperCase() + tabName.slice(1);

            return (
              <li
                key={tabName}
                className={`film-nav__item ${
                  tabName === currentTab && 'film-nav__item--active'
                }`}
              >
                <Link to={`${url}${tabLink}`} className='film-nav__link'>
                  {tabNameCapitalized}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Switch>
        <Route exact path={`${path}/${Tab.DETAILS}`}>
          <DetailsTab movieData={movieData} />
        </Route>
        <Route exact path={`${path}/${Tab.REVIEWS}`}>
          <ReviewsTab />
        </Route>
        <Route exact path={`${path}`}>
          <OverviewTab movieData={movieData} />
        </Route>
        <Route path='*'>
          <Redirect to={'/page-not-found'} />
        </Route>
      </Switch>
    </div>
  );
}
