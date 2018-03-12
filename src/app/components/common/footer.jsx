import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ year }) => (
    <footer>
        <p>Copyright © {year}, Lorem ipsum dolor sit amet, All rights reserved.</p>
    </footer>
);

Footer.propTypes = {
    year: PropTypes.string.isRequired,
};

export default Footer;
