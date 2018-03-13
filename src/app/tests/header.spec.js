import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './../components/common/footer';

let year = '2018';

describe('Footer component', () => {
    test('should show correct year', () => {
        const footer = renderer.create(
            <Footer
                year={year}
            />,
        );
        let tree = footer.toJSON();

        expect(tree).toMatchSnapshot();
        year = '2019';

        const footer1 = renderer.create(
            <Footer
                year={year}
            />,
        );

        tree = footer1.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

