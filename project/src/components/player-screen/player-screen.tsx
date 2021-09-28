import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import debounce from 'lodash.debounce';
import Slider from '@material-ui/core/Slider';
import Spinner from '../spinner/spinner';
import { useFetchMovieQuery } from '../../features/api/api-slice';
import { formatPlayerTime } from '../../utils/utils';
import { BaseReactPlayerProps } from 'react-player/base';

const HIDE_CONTROLS_DELAY = 4000;

export default function PlayerScreen(): JSX.Element {
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: movieData,
    isFetching: isMovieDataFetching,
    isError: isMovieDataFetchError,
    error: movieDataFetchError = {},
  } = useFetchMovieQuery(id);

  const initialPlayerState = {
    isPlaying: false,
    played: 0,
    playedSeconds: 0,
  };

  const [playerState, setPlayerState] = useState(initialPlayerState);
  const [controlsHidden, setControlsHidden] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hideControlsOnDelay = useCallback(
    debounce(() => {
      setControlsHidden(true);
    }, HIDE_CONTROLS_DELAY),
    [],
  );

  const showControls = () => {
    if (controlsHidden) {
      setControlsHidden(false);
    }
    if (!isSeeking) {
      hideControlsOnDelay();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') {
      setPlayerState({ ...playerState, isPlaying: !playerState.isPlaying });
    }
    showControls();
  };

  const onMouseMove = () => showControls();

  useEffect(() => () => hideControlsOnDelay.cancel(), [hideControlsOnDelay]);

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

  const duration = playerRef.current ? playerRef.current.getDuration() : 0;
  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : 0;

  const onExitButtonClick = () => history.go(-1);

  const onPlayPauseClick = () => {
    setPlayerState({ ...playerState, isPlaying: !playerState.isPlaying });
  };

  const onVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === 'VIDEO') {
      setPlayerState({ ...playerState, isPlaying: !playerState.isPlaying });
    }
  };

  const onFullScreenClick = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(playerContainerRef.current as HTMLDivElement);
    }
  };

  const onProgress: BaseReactPlayerProps['onProgress'] = ({
    played,
    playedSeconds,
  }) => {
    if (!isSeeking) {
      setPlayerState({
        ...playerState,
        played,
        playedSeconds,
      });
    }
  };

  const onSeek = (e: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      setPlayerState({ ...playerState, played: value / 100 });
    }
  };

  const onSeekMouseDown = () => {
    setIsSeeking(true);
    hideControlsOnDelay.cancel();
  };

  const onSeekMouseUp = (
    e: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[],
  ) => {
    setIsSeeking(false);
    hideControlsOnDelay();
    if (playerRef.current && typeof value === 'number') {
      playerRef.current.seekTo(value / 100);
    }
  };

  return (
    <div
      ref={playerContainerRef}
      className='player'
      style={{
        background: 'black',
        cursor: controlsHidden ? 'none' : 'auto',
        outline: 'none',
      }}
      onClick={onVideoClick}
      onKeyDown={onKeyDown}
      onMouseMove={onMouseMove}
      tabIndex={-1}
    >
      <ReactPlayer
        ref={playerRef}
        url={movieData.videoLink}
        height={'100%'}
        width={'100%'}
        playing={playerState.isPlaying}
        onProgress={onProgress}
      />
      <button
        onClick={onExitButtonClick}
        type='button'
        className='player__exit'
        style={controlsHidden ? { display: 'none' } : { display: 'block' }}
      >
        Exit
      </button>
      <div
        className='player__controls'
        style={controlsHidden ? { display: 'none' } : { display: 'block' }}
      >
        <div className='player__controls-row'>
          <div className='player__time'>
            <Slider
              size='small'
              defaultValue={0}
              aria-label='Small'
              value={playerState.played * 100}
              valueLabelDisplay='auto'
              valueLabelFormat={(value) => (
                <div>{formatPlayerTime(duration * (value / 100))}</div>
              )}
              onChange={onSeek}
              onMouseDown={onSeekMouseDown}
              onChangeCommitted={onSeekMouseUp}
              sx={{
                color: '#b3ae98',
              }}
            />
          </div>
          <div className='player__time-value'>
            {`-${formatPlayerTime(duration - currentTime)}`}
          </div>
        </div>
        <div className='player__controls-row'>
          <button
            onClick={onPlayPauseClick}
            type='button'
            className='player__play'
          >
            <svg viewBox='0 0 19 19' width={19} height={19}>
              <use xlinkHref={playerState.isPlaying ? '#pause' : '#play-s'} />
            </svg>
            <span>Play</span>
          </button>
          <div className='player__name'>{movieData.name}</div>
          <button
            onClick={onFullScreenClick}
            type='button'
            className='player__full-screen'
          >
            <svg viewBox='0 0 27 27' width={27} height={27}>
              <use xlinkHref='#full-screen' />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
