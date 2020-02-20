import { check } from 'express-validator';


export const signupInputRules = [
  check('firstName').exists().withMessage('The firstname is required')
    .isAlpha()
    .withMessage('First name should be only characters')
    .isLength({ min: 4 })
    .withMessage('Firstname must be atleast 4 characters'),
  check('lastName').trim().exists().withMessage('The lastname is required')
    .isAlpha()
    .withMessage('Last name should be only characters')
    .isLength({ min: 4 })
    .withMessage('Lastname must be atleast 4 characters'),
  check('email').trim().exists().withMessage('The email is required')
    .isEmail()
    .withMessage('The email field must contain a valid email address'),
  check('password').exists().matches(/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30}/).withMessage('At least 8 characters include symbols, uppercase, lowercase and number'),
];

export const changeRoles = [
  check('email').trim().exists().withMessage('The email is required')
    .isEmail()
    .withMessage('The email is required'),
  check('role').trim().exists().matches(/\b(super administrator|travel administrator|manager|travel team member|requester)\b/)
    .withMessage('The allowable roles are manager, travel team member, requester, travel administrator, super administrator')
];
export const editProfileValidationRules = [
  check('gender').isIn(['Male', 'Female']).withMessage('Gender must either be Male or Female'),
  check('currency').isIn(['USD', 'EUR', 'RWF']).withMessage('Only USD, EUR or RWF currencies are allowed'),
  check('department').isIn(['IT', 'Finance', 'communication']).withMessage('Please choose correct department'),
  check('language').isIn(['English', 'French']),
  check('birthdate').matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/).withMessage('enter vaid date')
];

export const resetPasswordRules = [check('password').exists().matches(/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30}/).withMessage('At least 8 characters include symbols, uppercase, lowercase and number')];
export const forgotPasswordRules = [check('email').trim().exists().withMessage('The email field must contain a valid email address')
  .isEmail()
  .withMessage('The email field must contain a valid email address')];
export const requestRules = [
  check('location').exists().withMessage('location is required')
    .isAlpha(),
  check('destination').exists().withMessage('destination is required')
    .isAlpha(),
  check('reason').exists().withMessage('reason is required')
    .isString(),
  check('accomodation').exists().withMessage('accomodation is required')
    .isString(),
  check('departureDate').exists().withMessage('departureDate is required').matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/)
    .withMessage('enter valid date with YYYY-MM-DD format'),
];
