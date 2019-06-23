import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Main from '../main/main.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import MovieDetail from '../movie-detail/movie-detail.jsx';
import AddReview from '../add-review/add-review.jsx';
import MyList from '../my-list/my-list.jsx';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/login" component={SignIn}/>
      <Route path="/myList" component={MyList}/>
      <Route path="/film/:id/review" component={AddReview}/>
      <Route path="/film/:id" component={MovieDetail}/>
    </Switch>
  );
};

export default App;
