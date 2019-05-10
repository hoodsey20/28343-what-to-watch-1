import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';
import films from './mocks/films';

function init() {
  ReactDOM.render(
      <App movies={films} />,
      document.querySelector(`#root`)
  );
}

init();
