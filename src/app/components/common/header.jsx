import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends PureComponent {
    render() {
        const { userName, isAuthenticated, logOut } = this.props;
        return (
            <header>
                <div className="header-container">
                    <Link to="/" replace className="link">
                        FrontCampper
                    </Link>
                    {isAuthenticated ?
                        <div className="user-container">
                            <p>{userName}</p>
                            <button className="link" onClick={() => logOut()}>logout</button>
                        </div> :
                        <p className="login-text">Login to see tweets</p>
                    }
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    userName: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        userName: state.user.get('userInfo').get('userName'),
        isAuthenticated: state.user.get('isAuthenticated'),
    };
}

function mapActionsToProps(dispatch) {
    return {
        logOut() {
            dispatch({ type: 'USER_LOGOUT' });
        },
    };
}

export default connect(mapStateToProps, mapActionsToProps)(Header);
