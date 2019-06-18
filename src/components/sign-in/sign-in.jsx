import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {userErrorSelector} from '../../reducer/user/selectors';
import {Operation} from '../../reducer/user/actions';
import withFormHandler from '../../hocs/with-form-handler/with-form-handler';
import withOnlySignedOut from '../../hocs/with-only-signed-out/with-only-signed-out';

export const SignIn = ({
  formSubmitHandler,
  inputHandler,
  makeAuth,
  error,
}) => {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="main.html" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={(evt) => {
          makeAuth(
              formSubmitHandler(evt)
          );
        }}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input onChange={inputHandler} className="sign-in__input" type="email" placeholder="Email address" name="email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input onChange={inputHandler} className="sign-in__input" type="password" placeholder="Password" name="password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
        {error && <div className="sign-in__message"><p>{error}</p></div>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: userErrorSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  makeAuth: (userData) => {
    dispatch(Operation.getUserData(userData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    withOnlySignedOut(
        withFormHandler(SignIn)
    )
);

SignIn.propTypes = {
  formSubmitHandler: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  makeAuth: PropTypes.func.isRequired,
  error: PropTypes.string,
};
