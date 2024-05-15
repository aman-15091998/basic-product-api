import { ErrorHandler } from "../utils/errorHandler.js";
export const handleError = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message;
  if (!(err instanceof ErrorHandler)) message = "Something went wrong"; //if instance is of Error class then update message
  res.status(statusCode).send(message);
};
