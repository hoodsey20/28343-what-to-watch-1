import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from "history";

import App from './components/app/app.jsx';
import reducer from './reducer/reducer';
import {createAPI} from './api';
import {Operation} from './reducer/movies/actions';

const customHistory = createBrowserHistory();

function init() {
  const api = createAPI(() => customHistory.push(`/login`));
  const middlewares = [thunk.withExtraArgument(api), logger];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(
      applyMiddleware(...middlewares)
  ));

  store.dispatch(Operation.loadMovies());

  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter history={customHistory}>
          <App />
        </BrowserRouter>
      </Provider>,
      document.querySelector(`#root`)
  );
}

init();
