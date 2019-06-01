import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import thunk from "redux-thunk";

import {App} from './components/app/app.jsx';
import {reducer} from './reducer';
import {createAPI} from './api';
import {Operation} from './actions';

function init() {
  const api = createAPI((...args) => store.dispatch(...args));
  const middlewares = [thunk.withExtraArgument(api), logger];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(
      applyMiddleware(...middlewares)
  ));

  store.dispatch(Operation.loadMovies());

  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
}

init();
