import i18n from 'i18n';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import passport from 'passport';
import welcome from './routes/welcome';
import swagger from './swagger/index';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import tripsRouter from './routes/tripsRoutes';
import commentsRouter from './routes/commentsRoutes';
import facilitiesRouter from './routes/facilityRoute';
import './config/passport';

dotenv.config();
i18n.configure({
  locales: ['fr', 'en'],
  defaultLocale: 'en',
  queryParameter: 'lang',
  directory: path.join(__dirname, 'services/localesServices/locales'),
});

const app = express();
app.use(i18n.init);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

app.use(cookieSession({
  secret: process.env.cookieSession,
  cookie: { maxAge: 100000 },
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 3000;

app.use('/', welcome);
app.use('/api-doc', swagger);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/trips', tripsRouter);
app.use('/api/v1/facilities', facilitiesRouter);
app.use('/api/v1/comments', commentsRouter);
app.use((req, res) => res.status(404).send({ status: 404, error: res.__('Route %s not found', req.url) }));

app.use((err, req, res) => res.status(500).send({ status: 500, error: res.__('server error') }));


app.listen(port, () => process.stdout.write(`Server is running on http://localhost:${port}/api`));

export default app;
