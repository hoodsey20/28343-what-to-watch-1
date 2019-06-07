import React from 'react';
import PropTypes from 'prop-types';

import withAuth from '../../hocs/with-auth/with-auth';

export const SignIn = ({formSubmitHandler, inputHandler}) => {
  return (
    <div className="sign-in user-page__content">
      <form action="#" className="sign-in__form" onSubmit={formSubmitHandler}>
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
    </div>
  );
};

SignIn.propTypes = {
  formSubmitHandler: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
};

export default withAuth(SignIn);
