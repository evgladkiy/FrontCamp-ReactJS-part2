import React from 'react';

import Footer from './../../common/footer';
import Header from './../../common/header';

const LoginPage = () => (
    <React.Fragment>
        <Header />
        <main className="login-page">
            <a className="btn" href="/auth/google">
                Sign In with
                <i className="fab fa-google-plus-g" />
            </a>
        </main>
        <Footer year="2018" />
    </React.Fragment>
);

export default LoginPage;
