import React from 'react';
import MainScreen from '../main-screen/main-screen';
import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';

type Props = {
  cardNumbers: number,
}

export default function App(props: Props): JSX.Element {
  const {cardNumbers} = props;

  return (
    <Switch>
      <Route exact path={AppRoute.ROOT}>
        <MainScreen cardNumbers={cardNumbers}/>
      </Route>
      <Route path={AppRoute.ROOT}>
        <div>Not found</div>
      </Route>
    </Switch>
  );
}
