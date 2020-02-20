import { validationResult } from 'express-validator';
import Response from '../utils/ResponseHandler';

const validationOutput = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const { errors } = result;
    const errorArray = errors.map((el) => res.__(el.msg));
    return Response.errorResponse(res, 400, errorArray);
  }
  next();
};
export default validationOutput;
