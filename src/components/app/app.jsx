import React from 'react';
import Main from '../main/main.jsx';

const movies = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

export default class App extends React.Component {
  render() {
    return (
      <Main
        movies={movies}
      />
    );
  }
}
