import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {  useFetchLoginMutation } from '../../features/api/api-slice';
import { setAuthStatus, setUserData } from '../../features/auth/auth-slice';
import { AuthStatus, AppRoute } from '../../const';


interface ILoginFormData {
  email: string,
  password: string,
}

export default function SignInScreen(): JSX.Element {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const history = useHistory();
  const authStatus = useAppSelector((state) => state.auth.status);

  if (authStatus === AuthStatus.AUTH) {
    history.push(AppRoute.ROOT);
  }

  const dispatch = useAppDispatch();
  const [login] = useFetchLoginMutation();

  const onSubmit = (data: ILoginFormData) => {
    login({email: data.email, password: data.password})
      .unwrap()
      .then((response) => {
        dispatch(setAuthStatus(AuthStatus.AUTH));
        dispatch(setUserData({
          userName: response.name,
          avatarUrl: response.avatarUrl as string,
          token: response.token,
        }));
        localStorage.setItem('token', response.token);
      })
      .catch((rejected) => {});
    history.push(AppRoute.ROOT);
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="main.html" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form onSubmit={handleSubmit(onSubmit)} className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                style={errors.email ? {border: '1px red solid'} : {}}
                placeholder="Email address"
                {...register('email', {
                  required: '- Email is required.',
                  pattern:  {
                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
                    message: '- Not a valid email adress',
                  },
                })}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                style={errors.password ? {border: '1px red solid'} : {}}
                type="password"
                placeholder="Password"
                id="user-password"
                {...register('password', {
                  required: '- Password is required',
                  pattern:  {
                    value: /^(?!\s*$).+/i,
                    message: '- Password can\'t consist of spaces',
                  },
                })
                }
              />
              {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
              {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

