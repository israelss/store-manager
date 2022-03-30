const Joi = require('joi');
const { clientError } = require('../../helpers/status_codes');

const statusCodesMap = {
  'any.required': clientError.BAD_REQUEST,
  'string.min': clientError.UNPROCESSABLE_ENTITY,
};

const nameSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  const { error } = nameSchema.validate({ name });

  if (error) {
    const [details] = error.details;
    const { type, message } = details;
    return res.status(statusCodesMap[type]).json({ message });
  }

  next();
};

module.exports = nameValidation;
