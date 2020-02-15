const getProfile = async (accessToken, refreshToken, profile, done) => {
  const method = profile.provider;
  const { id } = profile;
  const firstName = profile.name.givenName;
  const lastName = profile.name.familyName;
  const email = profile.emails[0].value;

  const user = {
    id, method, firstName, lastName, email
  };
  return done(null, user);
};

export default getProfile;
