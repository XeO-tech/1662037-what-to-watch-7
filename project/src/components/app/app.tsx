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

type Props = {
  cardNumbers: number,
}

export default function App(props: Props): JSX.Element {
  const {cardNumbers} = props;

  return (
    <Switch>
      <Route exact path={AppRoute.ROOT}>
        <MainScreen cardNumbers={cardNumbers} />
      </Route>
      <Route exact path={AppRoute.LOGIN}>
        <SignInScreen />
      </Route>
      <Route exact path={AppRoute.MY_LIST}>
        <MyListScreen />
      </Route>
      <Route exact path={AppRoute.FILM}>
        <FilmScreen />
      </Route>
      <Route exact path={AppRoute.REVIEW}>
        <ReviewScreen />
      </Route>
      <Route exact path={AppRoute.PLAYER}>
        <PlayerScreen />
      </Route>
      <Route exact path='*'>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}
