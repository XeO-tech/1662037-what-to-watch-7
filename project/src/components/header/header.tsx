import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from '../../app/hooks';
import { useFetchLogoutMutation } from '../../features/api/api-slice';
import { AppRoute, AuthStatus } from '../../const';


export default function Header(): JSX.Element {
  const avatarUrl = useAppSelector((state) => state.auth.avatarUrl);
  const userName = useAppSelector((state) => state.auth.userName);
  const isAuthentificated = useAppSelector((state) => state.auth.status) === AuthStatus.AUTH;
  const location = useLocation();
  const isMyListPage = location.pathname === AppRoute.MY_LIST;
  const { pathname } = useLocation();


  const [fetchLogut] = useFetchLogoutMutation();

  const onSignOutClick = (): void => {
    fetchLogut()
      .unwrap()
      .catch(() => toast.error('Logout failed. Try again later.', {
        position: toast.POSITION.TOP_LEFT,
      }));
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
        to={{pathname: AppRoute.LOGIN, state: {from: pathname}}}
        className="user-block__link"
      >Sign in
      </Link>
    </li>
  );

  return (
    <header className={`page-header ${isMyListPage ? 'user-page__head' : 'film-card__head'}`}>
      <ToastContainer />
      <div className="logo">
        <Link to={AppRoute.ROOT} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      {isMyListPage && <h1 className="page-title user-page__title">My list</h1>}
      <ul className="user-block">
        {isAuthentificated ? authorizedUserLink : unAuthorizedUserLink}
      </ul>
    </header>
  );
}
