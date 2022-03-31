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
  const saleArray = req.body;

  const error = saleArray
    .map(({ quantity }) => {
    const resul = quantitySchema
        .validate({ quantity });
        return resul;
  })
    .filter((result) => result.error !== undefined)
    .pop();

  if (error) {
    const [details] = error.error.details;
    const { type, message } = details;
    return res.status(statusCodesMap[type]).json({ message });
  }

  next();
};

module.exports = quantityValidation;
