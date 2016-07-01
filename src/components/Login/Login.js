/* eslint-disable no-shadow */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../../actions/auth';

function Login({ login, logout, errorMessage, isAuthenticated }) {
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout} className="btn btn-primary">
          Logout
        </button>
      ) : (
        <button onClick={login} className="btn btn-primary">
          Login
        </button>
      )}
      {errorMessage &&
        <p style={{ color: 'red' }}>{errorMessage}</p>
      }
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  isFetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

export default connect(state => ({
  isFetching: state.auth.isFetching,
  isAuthenticated: state.auth.isAuthenticated,
  errorMessage: state.auth.errorMessage,
}), {
  login,
  logout,
})(Login);
