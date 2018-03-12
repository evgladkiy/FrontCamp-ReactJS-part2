import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from './../../common/footer';
import Header from './../../common/header';
import MainPageBody from './pageComponents/mainPageBody';
import NotAuthenticatedBody from './pageComponents/notAuthenticatedBody';
import { authenticateUserAction, fetchUserDataAction } from './../../../actions/userActions';

class MainPage extends PureComponent {
    static fetchData(dispatch, user) {
        return dispatch(authenticateUserAction(user));
    }

    componentWillMount() {
        this.props.fetchUserData();
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                {this.props.isAuthenticated ?
                    <MainPageBody /> :
                    <NotAuthenticatedBody />
                }
                <Footer year="2018" />
            </React.Fragment>
        );
    }
}

MainPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    fetchUserData: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.get('isAuthenticated'),
    };
}

function mapActionsToProps(dispatch) {
    return {
        fetchUserData() {
            dispatch(fetchUserDataAction());
        },
    };
}

export default connect(mapStateToProps, mapActionsToProps)(MainPage);
