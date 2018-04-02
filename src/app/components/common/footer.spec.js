import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './footer';

describe('Footer component', () => {
    test('should show correct year', () => {
        const footer = renderer.create(<Footer year="2018" />);

        expect(footer.toJSON()).toMatchSnapshot();
    });
});
