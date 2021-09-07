import * as React from 'react';

export default function ShowMoreButton({onShowMoreClick}: {onShowMoreClick: () => void}): JSX.Element {

  return (
    <div className="catalog__more">
      <button onClick={onShowMoreClick} className="catalog__button" type="button">Show more</button>
    </div>
  );
}
