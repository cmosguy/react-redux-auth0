import React, {Component, PropTypes} from 'react';
import { login } from '../../actions/authenticate';

class Login extends Component {

    static propTypes = {
        login: PropTypes.func.isRequired,
        errorMessage: PropTypes.string,
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
    };

    render() {
        const { login, errorMessage } = this.props;

        return (
            <div>
                <button onClick={login} className="btn btn-primary">
                    Login
                </button>

                {errorMessage &&
                <p style={{color:'red'}}>{errorMessage}</p>
                }
            </div>
        )
    }
}

export default connect(state => ({
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
}), {
    login,
})(Login);
