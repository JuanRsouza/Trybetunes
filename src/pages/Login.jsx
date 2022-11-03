import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Carregando from './Carregando';

class Login extends Component {
  render() {
    const { userName,
      handleChange,
      isInputValid,
      buttonClickChange,
      carregando,
    } = this.props;

    if (carregando) return <Carregando />;

    return (
      <div data-testid="page-login">
        <form onSubmit={ buttonClickChange }>
          <label htmlFor="user-name">
            Nome de usuário
            <input
              type="text"
              name="userName"
              onChange={ handleChange }
              value={ userName }
              id="user-name"
              data-testid="login-name-input"
              placeholder="Digite seu nome"
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ !isInputValid }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  userName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isInputValid: PropTypes.bool.isRequired,
  buttonClickChange: PropTypes.func.isRequired,
  carregando: PropTypes.bool.isRequired,

};
export default withRouter(Login);
