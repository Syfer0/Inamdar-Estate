interface HttpError extends Error {
  statusCode: number;
}

export const errorHandler = (statusCode: number, message: string) => {
  const error = new Error(message) as HttpError;
  error.statusCode = statusCode;
  return error;
};
