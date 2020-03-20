import { check, query } from 'express-validator';


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
  check('role').trim().exists().withMessage('The passport name is required')
    .matches(/\b(super administrator|travel administrator|manager|travel team member|requester)\b/)
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
  check('departureDate').exists().withMessage('departureDate is required').matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/)
    .withMessage('enter valid date with YYYY-MM-DD format'),
  check('passportName').exists().withMessage('The passport name is required')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Passport name should be only characters')
    .isLength({ min: 4 })
    .withMessage('Passport name must be atleast 4 characters'),
  check('role').exists().withMessage('The role is required')
    .trim()
    .matches(/\b(super administrator|travel administrator|manager|travel team member|requester)\b/)
    .withMessage('The allowable roles are manager, travel team member, requester, travel administrator, super administrator'),
  check('gender').exists().withMessage('Gender is required').isIn(['Male', 'Female'])
    .withMessage('Gender must either be Male or Female'),
];
export const returnTripRules = [check('location').exists().withMessage('location is required').bail()
  .isAlpha(),
check('destination').exists().withMessage('destination is required').bail()
  .isAlpha()
  .withMessage('destination should  only be letter'),
check('reason').exists().withMessage('reason is required'),
check('departureDate').exists().withMessage('departureDate is required').matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/)
  .withMessage('enter valid date with YYYY-MM-DD format'),
check('returnDate').exists().withMessage('returnDate is required').matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/)
  .withMessage('enter valid date with YYYY-MM-DD format'),
check('passportName').exists().withMessage('The passport name is required')
  .matches(/^[A-Za-z\s]+$/)
  .withMessage('Passport name should be only characters')
  .isLength({ min: 4 })
  .withMessage('Passport name must be atleast 4 characters'),
check('role').exists().withMessage('The role is required')
  .trim()
  .matches(/\b(super administrator|travel administrator|manager|travel team member|requester|supplier)\b/)
  .withMessage('The allowable roles are manager, travel team member, requester, travel administrator, super administrator'),
check('gender').exists().withMessage('Gender is required').isIn(['Male', 'Female'])
  .withMessage('Gender must either be Male or Female'),
];

export const createFacilityRules = [
  check('facilityName').not().isEmpty({ ignore_whitespace: true }).withMessage('facilityName is required')
    .bail(),
  check('location').not().isEmpty({ ignore_whitespace: true }).withMessage('location is required')
    .bail()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('location should only contain letter'),
  check('amenities').not().isEmpty({ ignore_whitespace: true }).withMessage('amenities are required'),
  check('services').not().isEmpty({ ignore_whitespace: true }).withMessage('services are required')];
export const multiCityTripRules = [check('location').exists().withMessage('location is required').bail()
  .isAlpha(),
check('destination').exists().withMessage('destination is required').bail()
  .isAlpha()
  .withMessage('destination should  only be letter'),
check('reason').exists().withMessage('reason is required'),
check('departureDate').exists().withMessage('departureDate is required').matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/)
  .withMessage('enter valid date with YYYY-MM-DD format'),
check('stops').exists().withMessage('The locations where you will stop by are required'),
check('stops.*.stopName').exists().withMessage('Please provide all your stop location names'),
check('stops.*.reason').exists().withMessage('Please add your trip reasons to all your stops'),
check('stops.*.stopArrivalDate').exists().matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/).withMessage('Please provide arrival date on each stop with YYYY-MM-DD format'),
check('stops.*.stopDepartureDate').exists().matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/).withMessage('Please provide departure date on each stop with YYYY-MM-DD format'),
];

export const bookingRules = [
  check('roomId').exists().withMessage('roomId is required'),
  check('facilityId').exists().withMessage('facilityId is required'),
  check('requestId').exists().withMessage('requestId is required'),
  check('checkin').exists().withMessage('checkin is required').matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/)
    .withMessage('enter valid date with YYYY-MM-DD format'),
  check('checkout').exists().withMessage('checkout is required').matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/)
    .withMessage('enter valid date with YYYY-MM-DD format')
];
export const searchQueryRules = [
  query('id').not().isEmpty({ ignore_whitespace: true }).withMessage('request ID can\'t be empty')
    .optional(),
  query('location').not().isEmpty({ ignore_whitespace: true }).matches(/^[A-Za-z\s]+$/)
    .withMessage('location should only contain letter')
    .optional(),
  query('destination').not().isEmpty({ ignore_whitespace: true })
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('destination should only contain letter')
    .optional(),
  query('accomodation').not().isEmpty({ ignore_whitespace: true }).withMessage('accommodation id must be a valid uuid')
    .optional(),
  query('status').matches(/\b(open|approved|rejected)\b/).withMessage('status can only be open, rejected or approved').optional(),
  query('departureDate').matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/)
    .withMessage('enter valid date with YYYY-MM-DD format').optional(),
  query('returnDate').matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/)
    .withMessage('enter valid date with YYYY-MM-DD format').optional(),
  query('reason').not().isEmpty({ ignore_whitespace: true }).withMessage('reason must be atleast one character')
    .optional(),
];
export const commentRules = [
  check('comment').exists().trim().isLength({ min: 1, max: 200 })
    .withMessage('a comment is required with maximum 200 characters')
];

export const commentIdRules = [
  check('commentId').exists().trim().isLength({ min: 1, max: 200 })
    .withMessage('a commentId is required with maximum 200 characters')
];
export const rateQueryRules = [
  query('rating').not().isEmpty({ ignore_whitespace: true }).withMessage('the rating must be provided')
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage('the rating can only be an integer number less or equal to 5')
];
