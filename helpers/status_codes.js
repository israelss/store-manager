const success = {
  OK: 200,
};

const clientError = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
};

module.exports = {
  success,
  clientError,
};
