import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { AuthStatus, AppRoute } from '../../const';

type Props = {
  exact: boolean;
  path: string;
  render: () => JSX.Element;
};

export default function PrivateRoute(props: Props): JSX.Element {
  const { render, exact, path } = props;
  const authStatus = useAppSelector((state) => state.auth.status);
  const { pathname } = useLocation();

  return (
    <Route
      exact={exact}
      path={path}
      render={() =>
        authStatus === AuthStatus.AUTH ? (
          render()
        ) : (
          <Redirect
            to={{ pathname: AppRoute.LOGIN, state: { from: pathname } }}
          />
        )
      }
    />
  );
}
