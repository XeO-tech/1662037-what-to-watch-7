import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useFetchMovieQuery } from '../../features/api/api-slice';
import Header from '../header/header';
import Spinner from '../spinner/spinner';
import { ICommentData } from '../../common/types';


interface IFormData {
  rating: string,
  comment: string,
}

export default function ReviewScreen(): JSX.Element {
  const {id} : {id: string} = useParams();

  const {
    data: movieDate,
    isFetching,
    isError,
  } = useFetchMovieQuery(id);

  const { register, handleSubmit, formState: { errors: formErrors, isValid: isFormValid } } = useForm({mode: 'onChange'});

  if (isFetching) {
    return <Spinner />;
  }

  if (isError || !movieDate) {
    return <p>Couldn&apos;t load data from server</p>;
  }

  const onSubmit = (data: ICommentData) => {
    console.log(data);
  };

  return (
    <section className="film-card film-card--full">
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
        <form onSubmit={handleSubmit(onSubmit)} className="add-review__form">
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
              <button className="add-review__btn" type="submit" disabled={!isFormValid}>Post</button>
            </div>
          </div>
        </form>
        {formErrors.rating && <p style={{color: 'red'}}>{formErrors.rating.message}</p>}
        {formErrors.comment && <p style={{color: 'red'}}>{formErrors.comment.message}</p>}
      </div>
    </section>
  );
}
