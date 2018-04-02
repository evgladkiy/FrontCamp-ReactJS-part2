import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Header extends PureComponent {
    render() {
        const { isAuthenticated } = this.props;

        return (
            <header>
                <div className="header-container">
                    <Link to="/" replace className="link">
                        FrontCampper
                    </Link>
                    {isAuthenticated ?
                        <div className="user-container">
                            <p>{this.props.userName}</p>
                            <a className="link" href="/auth/logout">Sign out</a>
                        </div> :
                        <Link to="/login" replace className="link">Sign in</Link>
                    }
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    userName: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        userName: state.user.get('userInfo').get('userName'),
        isAuthenticated: state.user.get('isAuthenticated'),
    };
}

export default connect(mapStateToProps)(Header);
