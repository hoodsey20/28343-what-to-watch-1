import * as React from "react";

const withFormHandler = Component => {
  class WithFormHandler extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {};
      this._inputHandler = this._inputHandler.bind(this);
      this._formSubmitHandler = this._formSubmitHandler.bind(this);
    }

    _formSubmitHandler(evt) {
      evt.preventDefault();
      return this.state;
    }

    _inputHandler(evt) {
      const { name, value } = evt.target;
      this.setState({ [name]: value });
    }

    render() {
      return (
        <Component
          {...this.props}
          formSubmitHandler={this._formSubmitHandler}
          inputHandler={this._inputHandler}
          state={this.state}
        />
      );
    }
  }

  return WithFormHandler;
};

export default withFormHandler;
