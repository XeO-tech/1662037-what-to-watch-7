import React from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import { useFetchMovieQuery } from '../../features/api/api-slice';
import { convertRunTimeMinutesToHours } from '../../utils/utils';
import { RunTimeFormat } from '../../const';


export default function PlayerScreen(): JSX.Element {
  const {id} : {id: string} = useParams();
  const history = useHistory();

  const {
    data: movieData,
    isFetching: isMovieDataFetching,
    isError: isMovieDataFetchError,
    error: movieDataFetchError = {},
  } = useFetchMovieQuery(id);

  if (isMovieDataFetching) {
    return <Spinner />;
  }

  if (isMovieDataFetchError || !movieData) {
    if ('status' in movieDataFetchError) {
      if (movieDataFetchError.status === 404) {
        return <Redirect to={'/movie-not-found'} />;
      }
    }
    return <p>Could not load data from server. Try again later</p>;
  }

  const onExitButtonClick = () => history.go(-1);

  return (
    <div className="player">
      <video autoPlay controls preload="metadata" src={movieData.videoLink} className="player__video" poster={movieData.posterImage} />
      <button onClick={onExitButtonClick} type="button" className="player__exit">Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={0} max={100} />
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{movieData.runTime}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width={19} height={19}>
              <use xlinkHref="#play-s" />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{convertRunTimeMinutesToHours(movieData.runTime, RunTimeFormat.NUMBERS)}</div>
          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width={27} height={27}>
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
