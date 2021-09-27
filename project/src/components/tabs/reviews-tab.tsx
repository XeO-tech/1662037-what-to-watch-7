import React from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Spinner from '../spinner/spinner';
import { useFetchMovieReviewsQuery } from '../../features/api/api-slice';

export default function ReviewsTab(): JSX.Element {
  const { id }: { id: string } = useParams();

  const {
    data: reviewsData = [],
    isFetching: isReviewsFetching,
    isSuccess: isReviewsFetchSuccess,
    isError: isReviewsFetchError,
  } = useFetchMovieReviewsQuery(id);

  if (isReviewsFetching) {
    return <Spinner isTopLeftAligned />;
  }

  return (
    <div className='film-card__reviews film-card__row'>
      <div className='film-card__reviews-col'>
        {isReviewsFetchError && (
          <p>Couldn&apos;t load reviews. Please, try refreshing the page.</p>
        )}

        {isReviewsFetchSuccess && reviewsData.length === 0 && (
          <p>No reviews yet.</p>
        )}

        {isReviewsFetchSuccess &&
          reviewsData.map((review) => (
            <div key={review.id} className='review'>
              <blockquote className='review__quote'>
                <p className='review__text'>{review.comment}</p>
                <footer className='review__details'>
                  <cite className='review__author'>{review.user.name}</cite>
                  <time className='review__date' dateTime={review.date}>
                    {dayjs(review.date).format('MMMM DD, YYYY')}
                  </time>
                </footer>
              </blockquote>
              <div className='review__rating'>{review.rating}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
