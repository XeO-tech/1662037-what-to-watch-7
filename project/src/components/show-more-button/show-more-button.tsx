import * as React from 'react';

interface Props {
  onShowMoreClick: () => void,
}

export default function ShowMoreButton(props: Props): JSX.Element {
  const {onShowMoreClick} = props;

  return (
    <div className="catalog__more">
      <button onClick={onShowMoreClick} className="catalog__button" type="button">Show more</button>
    </div>
  );
}
