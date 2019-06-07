import React from 'react';
import PropTypes from 'prop-types';

const withAuth = (Component) => {
  class WithAuth extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {};
      this._inputHandler = this._inputHandler.bind(this);
      this._formSubmitHandler = this._formSubmitHandler.bind(this);
    }

    _formSubmitHandler(evt) {
      evt.preventDefault();
      const {requestHandler} = this.props;
      requestHandler(this.state);
    }

    _inputHandler(evt) {
      const {name, value} = evt.target;
      this.setState({[name]: value});
    }

    render() {
      return (
        <Component
          {...this.props}
          formSubmitHandler={this._formSubmitHandler}
          inputHandler={this._inputHandler}
        />
      );
    }
  }

  WithAuth.propTypes = {
    requestHandler: PropTypes.func,
  };

  return WithAuth;
};

export default withAuth;
