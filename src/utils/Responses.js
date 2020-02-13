
const response = (res, status, message, data) => res.status(status).json({
  status,
  message,
  data
});

export default response;
