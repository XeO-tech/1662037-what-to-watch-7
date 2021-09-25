import React, {useState, useRef} from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import Spinner from '../spinner/spinner';
import { useFetchMovieQuery } from '../../features/api/api-slice';
import { defineRemainingTime } from '../../utils/utils';
import { BaseReactPlayerProps } from 'react-player/base';


export default function PlayerScreen2(): JSX.Element {
  const {id} : {id: string} = useParams();
  const history = useHistory();
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: movieData,
    isFetching: isMovieDataFetching,
    isError: isMovieDataFetchError,
    error: movieDataFetchError = {},
  } = useFetchMovieQuery(id);

  const initialState = {
    isPlaying: false,
    played: 0,
    playedSeconds: 0,
  };

  const [state, setState] = useState(initialState);

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

  const onPlayPauseClick = () => {
    setState({...state, isPlaying: !state.isPlaying});
  };

  const onFullScreenClick = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(playerContainerRef.current as HTMLDivElement);
    }
  };

  const handleProgress: BaseReactPlayerProps['onProgress'] = ({played,playedSeconds}) => {
    setState({...state, played, playedSeconds});
  };

  return (
    <div ref={playerContainerRef} className="player" style={{background: 'black'}}>
      <ReactPlayer
        ref={playerRef}
        url={movieData.videoLink}
        muted
        height={'100%'}
        width={'100%'}
        playing={state.isPlaying}
        onProgress={handleProgress}
      />
      <button onClick={onExitButtonClick} type="button" className="player__exit">Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={state.played * 100} max={100} />
            <div className="player__toggler" style={{left: `${state.played * 100}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{defineRemainingTime(movieData.runTime, Math.floor(state.playedSeconds))}</div>
        </div>
        <div className="player__controls-row">
          <button onClick={onPlayPauseClick} type="button" className="player__play">
            <svg viewBox="0 0 19 19" width={19} height={19}>
              <use xlinkHref={state.isPlaying ? '#pause' : '#play-s'} />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{movieData.name}</div>
          <button onClick={onFullScreenClick} type="button" className="player__full-screen">
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
