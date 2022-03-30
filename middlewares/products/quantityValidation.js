const Joi = require('joi');
const { clientError } = require('../../helpers/status_codes');

const statusCodesMap = {
  'any.required': clientError.BAD_REQUEST,
  'number.min': clientError.UNPROCESSABLE_ENTITY,
};

const quantitySchema = Joi.object({
  quantity: Joi.number().min(1).required(),
});

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;

  const { error } = quantitySchema.validate({ quantity });

  if (error) {
    const [details] = error.details;
    const { type, message } = details;
    return res.status(statusCodesMap[type]).json({ message });
  }

  next();
};

module.exports = quantityValidation;
