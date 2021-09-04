import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IFilmDataAdapted } from '../../common/types';
import { AppRoute } from '../../const';
import VideoPreview from '../video-preview/video-preview';

const VIDEO_PREVIEW_DELAY = 1000;

type Props = {
  filmData: IFilmDataAdapted,
  onCardHover: (event: React.MouseEvent<HTMLElement>) => void;
}
let timeout: ReturnType<typeof setTimeout>;

export default function Card(props: Props): JSX.Element {
  const {filmData, onCardHover} = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const history = useHistory();

  const onMouseEnter = (evt: React.MouseEvent<HTMLElement>): void => {
    timeout = setTimeout(() => {
      setIsPlaying(true);
    }, VIDEO_PREVIEW_DELAY);
  };

  const onMouseLeave = (evt: React.MouseEvent<HTMLElement>): void => {
    clearTimeout(timeout);
    setIsPlaying(false);
  };

  return (
    <article
      style={{cursor: 'pointer'}}
      onMouseEnter={
        (evt) => {
          onCardHover(evt);
          onMouseEnter(evt);
        }
      }
      onMouseLeave={
        (evt) => {
          onMouseLeave(evt);
        }
      }
      onClick={
        () => {
          history.push(AppRoute.FILM.replace(/:id/, String(filmData.id)));
        }
      }
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        {isPlaying ?
          VideoPreview(filmData.videoLink) :
          <img src={filmData.previewImage} alt={filmData.name} width={280} height={175} />}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.FILM.replace(/:id/, String(filmData.id))}>{filmData.name}</Link>
      </h3>
    </article>);
}
