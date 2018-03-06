import MainPage from './components/pages/mainPage/mainPage';
import LoginPage from './components/pages/login/loginPage';
import NotMatch from './components/pages/notMatch/notMatch';

export default [
    {
        path: '/',
        exact: true,
        component: MainPage,
    },
    {
        exact: true,
        path: '/login',
        component: LoginPage,
    },
    {
        path: '*',
        component: NotMatch,
    },
];
