import React from 'react';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Header from '../header/header';
import {  useFetchLoginMutation } from '../../features/api/api-slice';
import { AuthStatus, AppRoute } from '../../const';
import Footer from '../footer/footer';


interface ILoginFormData {
  email: string,
  password: string,
}

interface historyLocationStateType {
  from: string,
}

export default function SignInScreen(): JSX.Element {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory<historyLocationStateType>();
  const authStatus = useAppSelector((state) => state.auth.status);
  const redirectUrl = history.location.state ? history.location.state.from : AppRoute.ROOT;

  const [login] = useFetchLoginMutation();

  if (authStatus === AuthStatus.AUTH) {
    return <Redirect to={redirectUrl} />;
  }

  const onSubmit = (data: ILoginFormData) => {
    login({email: data.email, password: data.password})
      .unwrap()
      .catch(() => toast.error('Login failed. Try again later.', {
        position: toast.POSITION.TOP_LEFT,
      }));
  };

  return (
    <div className="user-page">
      <ToastContainer />
      <Header />
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

