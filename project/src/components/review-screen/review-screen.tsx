import React, { useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useFetchMovieQuery, usePostCommentMutation } from '../../features/api/api-slice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../header/header';
import Spinner from '../spinner/spinner';
import { ICommentFormData } from '../../common/types';
import { AppRoute } from '../../const';


export default function ReviewScreen(): JSX.Element {
  const {id} : {id: string} = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const history = useHistory();

  const {
    data: movieDate,
    isFetching,
    isError,
  } = useFetchMovieQuery(id);

  const [postComment] = usePostCommentMutation();

  const { register, handleSubmit, formState: { errors: formErrors, isValid: isFormValid } } = useForm({mode: 'onChange'});

  if (isFetching) {
    return <Spinner />;
  }

  if (isError || !movieDate) {
    return <p>Couldn&apos;t load data from server</p>;
  }

  const getFormElements = () => {
    if (formRef.current !== null && submitButtonRef.current !== null) {
      return [...Array.from(formRef.current.querySelectorAll('input')), formRef.current.querySelector('textarea') as HTMLTextAreaElement, submitButtonRef.current];
    }
    return [];
  };

  const disableFormElements = () => getFormElements().forEach((element) => element.disabled = true);

  const enableFormElements = () => getFormElements().forEach((element) => element.disabled = false);

  const onSubmit = (data: ICommentFormData) => {
    disableFormElements();
    postComment({id, body: data})
      .unwrap()
      .then(() => {
        enableFormElements();
        history.push(AppRoute.FILM.replace(/:id\/:tabName/, `${id}/reviews`));
      })
      .catch(() => {
        enableFormElements();
        toast.error('Posting comment failed. Try again later.', {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  return (
    <section className="film-card film-card--full">
      <ToastContainer />
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={movieDate.backgroundImage} alt={movieDate.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header />
        <div className="film-card__poster film-card__poster--small">
          <img src={movieDate.posterImage} alt={movieDate.name} width={218} height={327} />
        </div>
      </div>
      <div className="add-review">
        <form
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
          className="add-review__form"
        >
          <div className="rating">
            <div className="rating__stars">
              <input
                {...register('rating', {
                  required: 'Rating is required',
                })}
                className="rating__input"
                id="star-10"
                type="radio"
                name="rating"
                defaultValue={10}
              />
              <label className="rating__label" htmlFor="star-10">Rating 10</label>
              <input
                {...register('rating', {
                  required: 'Rating is required',
                })}
                className="rating__input"
                id="star-9"
                type="radio"
                name="rating"
                defaultValue={9}
              />
              <label className="rating__label" htmlFor="star-9">Rating 9</label>
              <input
                {...register('rating', {
                  required: 'Rating is required',
                })}
                className="rating__input"
                id="star-8"
                type="radio"
                name="rating"
                defaultValue={8}
              />
              <label className="rating__label" htmlFor="star-8">Rating 8</label>
              <input
                {...register('rating', {
                  required: 'Rating is required',
                })}
                className="rating__input"
                id="star-7"
                type="radio"
                name="rating"
                defaultValue={7}
              />
              <label className="rating__label" htmlFor="star-7">Rating 7</label>
              <input
                {...register('rating', {
                  required: 'Rating is required',
                })}
                className="rating__input"
                id="star-6"
                type="radio"
                name="rating"
                defaultValue={6}
              />
              <label className="rating__label" htmlFor="star-6">Rating 6</label>
              <input
                {...register('rating', {
                  required: 'Rating is required',
                })}
                className="rating__input"
                id="star-5"
                type="radio"
                name="rating"
                defaultValue={5}
              />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
              <input
                {...register('rating', {
                  required: 'Rating is required',
                })}
                className="rating__input"
                id="star-4"
                type="radio"
                name="rating"
                defaultValue={4}
              />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>
              <input
                {...register('rating', {
                  required: 'Rating is required',
                })}
                className="rating__input"
                id="star-3"
                type="radio"
                name="rating"
                defaultValue={3}
              />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>
              <input
                {...register('rating', {
                  required: 'Rating is required',
                })}
                className="rating__input"
                id="star-2"
                type="radio"
                name="rating"
                defaultValue={2}
              />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>
              <input
                {...register('rating', {
                  required: 'Rating is required',
                })}
                className="rating__input"
                id="star-1"
                type="radio"
                name="rating"
                defaultValue={1}
              />
              <label className="rating__label" htmlFor="star-1">Rating 1</label>
            </div>
          </div>
          <div className="add-review__text">
            <textarea
              {...register('comment',
                {
                  required: 'Comment is required',
                  minLength: {
                    value: 50,
                    message: 'Comment should be not less than 50 symbols',
                  },
                  maxLength: {
                    value: 400,
                    message: 'Comment should be not more than 400 symbols',
                  },
                })}
              className="add-review__textarea"
              name="comment"
              id="review-text"
              placeholder="Review text"
              defaultValue={''}
            />
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={!isFormValid}
                ref={submitButtonRef}
              >Post
              </button>
            </div>
          </div>
        </form>
        {formErrors.rating && <p style={{color: 'red'}}>{formErrors.rating.message}</p>}
        {formErrors.comment && <p style={{color: 'red'}}>{formErrors.comment.message}</p>}
      </div>
    </section>
  );
}
