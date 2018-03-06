import React from 'react';

import Footer from '../../common/footer';
import Header from '../../common/header';

const NotMatch = () => (
    <React.Fragment>
        <Header />
        <main>
            <h2 className="page-not-found">Page not found ...</h2>
        </main>
        <Footer year="2018" />
    </React.Fragment>
);

export default NotMatch;
