import React from 'react';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {  useFetchLoginMutation } from '../../features/api/api-slice';
import { AuthStatus, AppRoute } from '../../const';
import Footer from '../footer/footer';


interface ILoginFormData {
  email: string,
  password: string,
}

export default function SignInScreen(): JSX.Element {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const history = useHistory();
  const authStatus = useAppSelector((state) => state.auth.status);

  const [login] = useFetchLoginMutation();

  if (authStatus === AuthStatus.AUTH) {
    return <Redirect to={AppRoute.ROOT} />;
  }

  const onSubmit = (data: ILoginFormData) => {
    login({email: data.email, password: data.password})
      .unwrap()
      .then(() => history.push(AppRoute.ROOT))
      .catch(() => toast.error('Login failed. Try again later.', {
        position: toast.POSITION.TOP_LEFT,
      }));
  };

  return (
    <div className="user-page">
      <ToastContainer />
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
      <Footer />
    </div>
  );
}

