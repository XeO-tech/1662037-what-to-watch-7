import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom';
import { filmsData } from './components/mocks/data';
import { store } from './app/store';

const CARD_NUMBERS = 8;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App cardNumbers={CARD_NUMBERS} filmsData={filmsData }/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
