import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import passport from 'passport';
import './config/passport-setup';

import tweets from './routes/tweets';
import auth from './routes/auth';
import keys from './config/keys';
import handleRender from './handleRender/handleRender';
import connectionToDB from './mongoose/connectionToDB';

const app = express();

connectionToDB
    .then(() => app.listen(4444))
    .catch(err => console.log(err));

app.use(express.static('public'));
// app.use(cors());
app.use(express.json());
app.use(cookieSession({
    maxAge: 15 * 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/tweets', tweets);
app.use('/auth', auth);
app.get('/*', handleRender);
