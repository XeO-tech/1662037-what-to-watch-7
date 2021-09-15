import * as React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Tabs from '../tabs/tabs';
import FilmCardsList from '../film-cards-list/film-cards-list';
import Header from '../header/header';
import Footer from '../footer/footer';
import Spinner from '../spinner/spinner';
import { useFetchMovieQuery, useFetchSimilarMoviesQuery } from '../../features/api/api-slice';
import { SIMILAR_FILMS_NUMBER } from '../../const';


export default function MovieScreen(): JSX.Element {
  const {id} : {id: string} = useParams();

  const {
    data: movieData,
    isFetching: isMovieDataFetching,
    isError: isMovieDataFetchError,
    error: movieDataFetchError = {},
  } = useFetchMovieQuery(id);

  const {
    data: similarMoviesData = [],
    isSuccess: isSimilarMovieDataFetchSuccess,
  } = useFetchSimilarMoviesQuery(id);

  const filteredSimilarMoviesData = similarMoviesData.filter((similarMovieData) => similarMovieData.id !== Number(id));

  if (isMovieDataFetching) {
    return <Spinner />;
  }

  if (isMovieDataFetchError || !movieData) {
    if ('status' in movieDataFetchError) {
      movieDataFetchError.status === 404 && <Redirect to={'/movie-not-found'} />;
    }
    return <p>Could not load data from server. Try again later</p>;
  }


  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={movieData.backgroundImage} alt={movieData.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header />
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movieData.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movieData.genre}</span>
                <span className="film-card__year">{movieData.released}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width={19} height={20}>
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn film-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={movieData.posterImage} alt={`${movieData.name} poster`} width={218} height={327} />
            </div>
            <Tabs movieData={movieData} id={id}/>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          {isSimilarMovieDataFetchSuccess && (filteredSimilarMoviesData.length === 0) ?
            'No similair movies found' :
            <FilmCardsList cardNumbers={SIMILAR_FILMS_NUMBER} filmsData={filteredSimilarMoviesData} onCardHover={() => void 0}/>}
        </section>
        <Footer />
      </div>
    </div>
  );
}
