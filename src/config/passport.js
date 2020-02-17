import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import dotenv from 'dotenv';
import getProfile from '../utils/getProfile';
import db from '../models';

dotenv.config();

passport.use(new GoogleStrategy({
  callbackURL: '/api/v1/auth/google/redirect',
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
}, getProfile));

passport.use(new FacebookStrategy({
  callbackURL: '/api/v1/auth/facebook/redirect',
  clientID: process.env.fbAppID,
  clientSecret: process.env.fbAppSecret,
  profileFields: ['id', 'name']
}, getProfile));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const user = await db.User.findOne({ where: { id } });
  done(null, user);
});

export default passport;
