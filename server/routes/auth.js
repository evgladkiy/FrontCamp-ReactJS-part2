import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/user', (req, res) => {
    const user = req.user || {};

    res.send(user);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
    scope: [
        'profile',
        'email',
    ],
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});

export default router;
