import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../main-screen/main-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import FilmScreen from '../film-screen/film-screen';
import ReviewScreen from '../review-screen/review-screen';
import PlayerScreen from '../player-screen/player-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { useAppSelector } from '../../app/hooks';
import { useFetchMoviesQuery } from '../../features/api/api-slice';

// import TestScreen from '../test/test';
// import { createApi } from '../../services/api';
// import { adaptFilmToClient } from '../../utils/adapter';

type Props = {
  cardNumbers: number,
}

export default function App(props: Props): JSX.Element {
  const {cardNumbers} = props;
  const filmsData = useAppSelector((state) => state.movies.moviesList);

  const {
    data: moviesData = [],
    isFetching,
    isSuccess,
    isError,
    error,
  } = useFetchMoviesQuery();


  // useEffect(() => {
  //   createApi().get('/films').then((response) => console.log(response.data.map((element) => adaptFilmToClient(element))));
  //   createApi().get('/comments/4').then((response) => console.log(response.data));
  // });

  return (
    <Switch>
      <Route exact path={AppRoute.ROOT}>
        <MainScreen />
      </Route>
      <Route exact path={AppRoute.LOGIN}>
        <SignInScreen />
      </Route>
      <Route exact path={AppRoute.MY_LIST}>
        <MyListScreen filmsData={filmsData} cardNumbers={cardNumbers}/>
      </Route>
      <Route exact path={AppRoute.FILM}>
        <FilmScreen filmsData={filmsData}/>
      </Route>
      <Route exact path={AppRoute.REVIEW}>
        <ReviewScreen filmData={filmsData[0]}/>
      </Route>
      <Route exact path={AppRoute.PLAYER}>
        <PlayerScreen filmData={filmsData[0]}/>
      </Route>
      {/* <Route path={AppRoute.TEST}>
        <TestScreen />
      </Route> */}
      <Route path='*'>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}
