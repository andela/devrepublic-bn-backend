import { check } from 'express-validator';


const signupInputRules = [
  check('firstName').exists().withMessage('The firstname is required').isLength({ min: 4 })
    .withMessage('Firstname must be atleast 4 characters'),
  check('lastName').exists().withMessage('The lastname is required').isLength({ min: 4 })
    .withMessage('Lastname must be atleast 4 characters'),
  check('email').exists().withMessage('The email is required').isEmail()
    .withMessage('The email field must contain a valid email address'),
  check('password').exists().matches(/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30}/).withMessage('At least 8 characters are needed include symbols'),
];
export default signupInputRules;
