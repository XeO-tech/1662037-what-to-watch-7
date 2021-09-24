import React from 'react';
import dayjs from 'dayjs';
import { ICommentData } from '../../common/types';

type Props = {
  commentsData: ICommentData[],
  isCommentsFetchSuccess: boolean,
  isCommentsFetchError: boolean,
}

export default function ReviewsTab(props: Props): JSX.Element {
  const {commentsData, isCommentsFetchSuccess, isCommentsFetchError} = props;

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
