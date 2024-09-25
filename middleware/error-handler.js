const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ Error: err.message });
  }
  return res.status(500).json({ Error: err.message });
};
module.exports = errorHandlerMiddleware;
