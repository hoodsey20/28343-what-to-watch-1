import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Main from '../main/main.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import Favorites from '../favorites/favorites.jsx';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/login" component={SignIn}/>
      <Route path="/favorites" component={Favorites}/>
    </Switch>
  );
};

export default App;
