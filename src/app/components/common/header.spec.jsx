import React from 'react';
import { shallow } from 'enzyme';

import { Header } from './header';

describe('Header component', () => {
    test('should display correct authenticated user name', () => {
        const header = shallow(<Header isAuthenticated={true} userName="Vasia" />);

        expect(header.find('.user-container p').text()).toEqual('Vasia');
        expect(header.find('.link').last().text()).toEqual('Sign out');
    });

    test('should show "Sign in" link for unauthenticated users', () => {
        const header = shallow(<Header isAuthenticated={false} userName="" />);

        expect(header.find('.user-container p')).toHaveLength(0);
    });
});
