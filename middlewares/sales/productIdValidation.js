const Joi = require('joi');
const { clientError } = require('../../helpers/status_codes');

const statusCodesMap = {
  'any.required': clientError.BAD_REQUEST,
};

const productIdSchema = Joi.object({
  productId: Joi.required(),
});

const productIdValidation = (req, res, next) => {
  const { productId } = req.body;

  const { error } = productIdSchema.validate({ productId });

  if (error) {
    const [details] = error.details;
    const { type, message } = details;
    return res.status(statusCodesMap[type]).json({ message });
  }

  next();
};

module.exports = productIdValidation;
