import { check } from 'express-validator';


const signupInputRules = [
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

const changeRoles = [
  check('email').trim().exists().withMessage('The email is required')
    .isEmail()
    .withMessage('The email is required'),
  check('role').trim().exists().matches(/\b(super administrator|travel administrator|manager|travel team member|requester)\b/)
    .withMessage('The allowable roles are manager, travel team member, requester, travel administrator, super administrator')
];

export { signupInputRules, changeRoles };
