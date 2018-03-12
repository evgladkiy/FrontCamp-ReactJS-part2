import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

import User from './../models/userModel';
import keys from './keys';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ authId: profile.id }).then((currentUser) => {
        if (currentUser) {
            done(null, currentUser);
        } else {
            new User({
                userName: profile.displayName,
                authId: profile.id,
                email: profile.emails[0].value,
                avatar: profile._json.image.url,
            }).save().then((newUser) => {
                done(null, newUser);
            });
        }
    });
}));
