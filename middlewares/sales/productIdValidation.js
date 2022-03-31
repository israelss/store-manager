const Joi = require('joi');
const { clientError } = require('../../helpers/status_codes');

const statusCodesMap = {
  'any.required': clientError.BAD_REQUEST,
};

const productIdSchema = Joi.object({
  productId: Joi.required(),
});

const productIdValidation = (req, res, next) => {
  const saleArray = req.body;

  const error = saleArray
    .map(({ productId }) => {
    const resul = productIdSchema
        .validate({ productId });
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

module.exports = productIdValidation;
