import React from 'react';
import renderer from 'react-test-renderer';
import Spinner from './spinner';

describe('Spinner component', () => {
    test('should show correct spinner', () => {
        const spinner = renderer.create(<Spinner />);

        expect(spinner.toJSON()).toMatchSnapshot();
    });
});
