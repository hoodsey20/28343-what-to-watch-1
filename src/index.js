import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';

const MOVIES_LIST = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

function init() {
  ReactDOM.render(
      <App movies= {MOVIES_LIST} />,
      document.querySelector(`#root`));
}
init();
