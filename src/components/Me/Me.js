import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setMe} from '../../actions/me';

function Me({isAuthenticated, me}) {
    
    
    setMe(null);
    

    return (
        <div>
        <pre>
            {JSON.stringify(isAuthenticated)}
        </pre>
            {isAuthenticated &&
            <pre>{JSON.stringify(me)}</pre>
            }
        </div>
    );
}

Me.propTypes = {
    isAuthenticated: PropTypes.bool,
    setMe: PropTypes.func.isRequired
};

export default connect(state => ({
    isAuthenticated: state.auth.isAuthenticated,
    me: state.me.me
}), {
    setMe
})(Me);
