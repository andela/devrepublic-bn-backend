import Response from './ResponseHandler';

export default (req, res, next) => {
  if (req.query.remember === 'true') {
    const {
      gender, role, firstName, lastName
    } = req.user;
    if (!role || !gender || !firstName || !lastName) {
      return Response.errorResponse(res, 404, 'Please update your profile with gender, passport name and role');
    }
    req.body.gender = gender;
    req.body.role = role;
    req.body.passportName = `${firstName} ${lastName}`;
  }
  next();
};
