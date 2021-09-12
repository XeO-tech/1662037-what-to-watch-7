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
import { useAppDispatch } from '../../app/hooks';
import { useFetchMoviesQuery, useFetchAuthDataQuery } from '../../features/api/api-slice';
import { setAuthStatus, setUserData } from '../../features/auth/auth-slice';
import { AuthStatus } from '../../const';


export default function App(): JSX.Element {
  const {
    data: moviesData = [],
    isFetching: isMovieDataFetching,
    isError: isMoviesDataFetchError,
  } = useFetchMoviesQuery();

  const {
    data: authData = {name: '', avatarUrl:'', token:''},
    isFetching: isAuthDataFetching,
    isSuccess: isAuthDataFetched,
    isError: isAuthDataFetchError,
  } = useFetchAuthDataQuery();

  const dispatch = useAppDispatch();

  if (isMovieDataFetching || isAuthDataFetching) {
    return <Spinner />;
  }

  if (isMoviesDataFetchError) {
    return <p>Could not load data from server. Try again later</p>;
  }

  if (isAuthDataFetchError) {
    dispatch(setAuthStatus(AuthStatus.NO_AUTH));
    dispatch(setUserData({
      userName:'',
      avatarUrl:'',
      token: '',
    }));
  }

  if (isAuthDataFetched ) {
    dispatch(setAuthStatus(AuthStatus.AUTH));
    dispatch(setUserData({
      userName: authData.name,
      avatarUrl: authData.avatarUrl,
      token: authData.token,
    }));
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
      <Route path='*'>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}
