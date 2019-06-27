import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import App from './components/app/app.jsx';
import reducer from './reducer/reducer';
import {createAPI} from './api';
import {Operation} from './reducer/movies/actions';
import {Operation as UserOperation, ActionCreator as UserActionCreator} from './reducer/user/actions';

const customHistory = createBrowserHistory({forceRefresh: true});

function init() {
  const api = createAPI(() => {
    customHistory.push(`/login`);
  });
  const middlewares = [
    thunk.withExtraArgument(api),
    // eslint-disable-next-line
    process.env.NODE_ENV === `development` && logger
  ].filter(Boolean);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(
      applyMiddleware(...middlewares)
  ));

  function loadInitialData() {
    store.dispatch(Operation.loadPromo());
    store.dispatch(Operation.loadMovies());
  }

  function startApp() {
    loadInitialData();
    ReactDOM.render(
        <BrowserRouter history={customHistory}>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>,
        document.querySelector(`#root`)
    );
  }
  let isUserSignedIn;

  store.dispatch(UserOperation.getCurrentUser())
    .then((res) => {
      isUserSignedIn = res;
      startApp();
    });

  const CHECK_AUTH_TIMEOUT = 1000 * 10;

  // eslint-disable-next-line
  let checkAuthTimer = setTimeout(function checkAuth() {
    store.dispatch(UserOperation.getCurrentUser())
    .then((res) => {
      if (isUserSignedIn !== res) {
        if (!res) {
          store.dispatch(UserActionCreator.setUserData(null));
        }
        loadInitialData();
        isUserSignedIn = res;
      }
      checkAuthTimer = setTimeout(checkAuth, CHECK_AUTH_TIMEOUT);
    });
  }, CHECK_AUTH_TIMEOUT);

}

init();
