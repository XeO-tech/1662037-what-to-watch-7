import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useFetchLogoutMutation } from '../../features/api/api-slice';
import { setUserData, setAuthStatus } from '../../features/auth/auth-slice';
import { AppRoute, AuthStatus } from '../../const';


export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const avatarUrl = useAppSelector((state) => state.auth.avatarUrl);
  const userName = useAppSelector((state) => state.auth.userName);
  const isAuthentificated = useAppSelector((state) => state.auth.status) === AuthStatus.AUTH;

  const [fetchLogut] = useFetchLogoutMutation();
  const onSignOutClick = (): void => {
    fetchLogut()
      .unwrap()
      .then(() => {
        dispatch(setAuthStatus(AuthStatus.NO_AUTH));
        dispatch(setUserData({
          userName:'',
          avatarUrl:'',
          token: '',
        }));
      })
      .catch(() => {});
  };

  const authorizedUserLink = (
    <>
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link
            to={AppRoute.MY_LIST}
          >
            <img src={avatarUrl} alt={userName} width={63} height={63} />
          </Link>
        </div>
      </li>
      <li className="user-block__item">
        <div
          onClick={onSignOutClick}
          style={{cursor: 'pointer'}}
          className="user-block__link"
        >Sign out
        </div>
      </li>
    </>
  );

  const unAuthorizedUserLink = (
    <li className="user-block__item">
      <Link
        to={AppRoute.LOGIN}
        className="user-block__link"
      >Sign in
      </Link>
    </li>
  );

  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Link to={AppRoute.ROOT} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      <ul className="user-block">
        {isAuthentificated ? authorizedUserLink : unAuthorizedUserLink}
      </ul>
    </header>
  );
}
