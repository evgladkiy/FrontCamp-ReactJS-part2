import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from './../../common/footer';
import Header from './../../common/header';

class LoginPage extends PureComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <main className="login-page">
                    <button
                      className="btn"
                      onClick={() => this.props.logIn()}
                    >
                        <i className="fab fa-google-plus-g" />
                        Sign in
                    </button>
                </main>
                <Footer year="2018" />
            </React.Fragment>
        );
    }
}

LoginPage.propTypes = {
    logIn: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return state;
}

function mapActionsToProps(dispatch) {
    return {
        logIn() {
            dispatch({ type: 'USER_LOGIN' });
        },
    };
}

export default connect(mapStateToProps, mapActionsToProps)(LoginPage);
