import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';

import App from './components/app/app.jsx';
import {reducer} from './reducer';

function init() {
  const store = createStore(
      reducer,
      applyMiddleware(logger)
  );

  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
}

init();
