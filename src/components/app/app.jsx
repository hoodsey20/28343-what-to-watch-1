import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import NameSpace from '../../reducer/name-spaces';
import Main from '../main/main.jsx';
import SignIn from '../sign-in/sign-in.jsx';

const App = ({isAuthorizationRequired}) => {
  return (
    <React.Fragment>
      {isAuthorizationRequired ? (
        <SignIn />
      ) : (
        <Main />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthorizationRequired: state[NameSpace.USER].isAuthorizationRequired,
});

App.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
