import { validationResult } from 'express-validator';


const validationOutput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: res.__(errors.errors[0].msg) });
  }
  next();
};
export default validationOutput;
