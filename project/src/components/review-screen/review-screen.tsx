import * as React from 'react';
import { useState } from 'react';
import { IMovieDataAdapted } from '../../common/types';

type FormData = {
  rating: string,
  comment: string,
};

export default function ReviewScreen({filmData}: {filmData: IMovieDataAdapted}): JSX.Element {
  const initialState : FormData = {
    rating: '',
    comment: '',
  };

  const [formData, setFormData] = useState(initialState);

  const handleFormInputChange = (evt: React.FormEvent<HTMLElement>): void => {
    const { name, value } = evt.target as HTMLInputElement;
    setFormData(Object.assign({}, formData, {[name]: value}));
  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={filmData.backgroundImage} alt={filmData.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">{filmData.name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href='foo'>Add review</a>
              </li>
            </ul>
          </nav>
          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width={63} height={63} />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link" href='foo'>Sign out</a>
            </li>
          </ul>
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img src={filmData.posterImage} alt={filmData.name} width={218} height={327} />
        </div>
      </div>
      <div className="add-review">
        <form onChange={handleFormInputChange} action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              <input className="rating__input" id="star-10" type="radio" name="rating" defaultValue={10} />
              <label className="rating__label" htmlFor="star-10">Rating 10</label>
              <input className="rating__input" id="star-9" type="radio" name="rating" defaultValue={9} />
              <label className="rating__label" htmlFor="star-9">Rating 9</label>
              <input className="rating__input" id="star-8" type="radio" name="rating" defaultValue={8} defaultChecked />
              <label className="rating__label" htmlFor="star-8">Rating 8</label>
              <input className="rating__input" id="star-7" type="radio" name="rating" defaultValue={7} />
              <label className="rating__label" htmlFor="star-7">Rating 7</label>
              <input className="rating__input" id="star-6" type="radio" name="rating" defaultValue={6} />
              <label className="rating__label" htmlFor="star-6">Rating 6</label>
              <input className="rating__input" id="star-5" type="radio" name="rating" defaultValue={5} />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
              <input className="rating__input" id="star-4" type="radio" name="rating" defaultValue={4} />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>
              <input className="rating__input" id="star-3" type="radio" name="rating" defaultValue={3} />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>
              <input className="rating__input" id="star-2" type="radio" name="rating" defaultValue={2} />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>
              <input className="rating__input" id="star-1" type="radio" name="rating" defaultValue={1} />
              <label className="rating__label" htmlFor="star-1">Rating 1</label>
            </div>
          </div>
          <div className="add-review__text">
            <textarea className="add-review__textarea" name="comment" id="review-text" placeholder="Review text" defaultValue={''} />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
