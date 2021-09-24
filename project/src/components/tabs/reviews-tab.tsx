import React from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Spinner from '../spinner/spinner';
import { useFetchMovieCommentsQuery } from '../../features/api/api-slice';

export default function ReviewsTab(): JSX.Element {
  const {id}: {id: string} = useParams();

  const {
    data: commentsData = [],
    isFetching: isCommentsFetching,
    isSuccess: isCommentsFetchSuccess,
    isError: isCommentsFetchError,
  } = useFetchMovieCommentsQuery(id);

  if (isCommentsFetching) {
    return <Spinner />;
  }

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">

        {isCommentsFetchError && <p>Couldn&apos;t load comments. Please, try refreshing the page.</p>}

        {(isCommentsFetchSuccess && commentsData.length === 0) && <p>No comments yet.</p>}

        {isCommentsFetchSuccess && commentsData.map((comment) => (
          <div key={comment.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>
              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime={comment.date}>{dayjs(comment.date).format('MMMM DD, YYYY')}</time>
              </footer>
            </blockquote>
            <div className="review__rating">{comment.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
