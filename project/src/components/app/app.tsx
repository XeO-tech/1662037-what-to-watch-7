import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../main-screen/main-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import FilmScreen from '../film-screen/film-screen';
import ReviewScreen from '../review-screen/review-screen';
import PlayerScreen from '../player-screen/player-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Spinner from '../spinner/spinner';
import { useFetchMoviesQuery } from '../../features/api/api-slice';


export default function App(): JSX.Element {

  const {
    data: moviesData = [],
    isFetching,
    isError,
  } = useFetchMoviesQuery();


  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Could not load data from server. Try again later</p>;
  }

  return (
    <Switch>
      <Route exact path={AppRoute.ROOT}>
        <MainScreen />
      </Route>
      <Route exact path={AppRoute.LOGIN}>
        <SignInScreen />
      </Route>
      <Route exact path={AppRoute.MY_LIST}>
        <MyListScreen filmsData={moviesData} />
      </Route>
      <Route exact path={AppRoute.FILM}>
        <FilmScreen filmsData={moviesData}/>
      </Route>
      <Route exact path={AppRoute.REVIEW}>
        <ReviewScreen filmData={moviesData[0]}/>
      </Route>
      <Route exact path={AppRoute.PLAYER}>
        <PlayerScreen filmData={moviesData[0]}/>
      </Route>
      {/* <Route path={AppRoute.TEST}>
        <TestScreen />
      </Route> */}
      <Route path='*'>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}
