const getProfile = async (accessToken, refreshToken, profile, done) => {
  const method = profile.provider;
  const { id } = profile;
  // console.log(profile);
  const firstName = profile.name.givenName;
  const lastName = profile.name.familyName;
  const email = Array.isArray(profile.emails) ? profile.emails[0].value : '';

  const user = {
    id, method, firstName, lastName, email
  };
  done(null, user);
};

export default getProfile;
