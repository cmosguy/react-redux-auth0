import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function Me({ errorMessage, isAuthenticated }) {
    
    return (
        <div>
        <pre>
            {JSON.stringify(isAuthenticated)}
        </pre>
            {isAuthenticated &&
                <p>ME</p>
            }
        </div>
    );
}

Me.propTypes = {
    isAuthenticated: PropTypes.bool,
};

export default connect(state => ({
    isAuthenticated: state.auth.isAuthenticated,
}), {
    // login,
    // logout,
})(Me);
