import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom';
import { filmsData } from './mocks/data';
import { store } from './app/store';
import { setMovies } from './features/movies/movies-slice';

store.dispatch(setMovies(filmsData));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
