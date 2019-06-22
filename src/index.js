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
import {Operation as UserOperation} from './reducer/user/actions';

const customHistory = createBrowserHistory({forceRefresh: true});

function init() {
  const api = createAPI(() => {
    customHistory.push(`/login`);
  });
  const middlewares = [thunk.withExtraArgument(api), logger];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(
      applyMiddleware(...middlewares)
  ));

  store.dispatch(Operation.loadPromo());

  store.dispatch(UserOperation.getCurrentUser())
    .then(() => {
      store.dispatch(Operation.loadMovies());
    });

  ReactDOM.render(
      <BrowserRouter history={customHistory}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>,
      document.querySelector(`#root`)
  );
}

init();
