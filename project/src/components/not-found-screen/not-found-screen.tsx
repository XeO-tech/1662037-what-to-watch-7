import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function NotFoundScreen(): JSX.Element {
  return (
    <div>
      <p>«404 Not Found» </p>
      <Link to={AppRoute.ROOT}>Back to the main page</Link>
    </div>
  );
}
