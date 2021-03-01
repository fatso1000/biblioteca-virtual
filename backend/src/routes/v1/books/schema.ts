import Joi from "joi";

export default {
  uploadBook: Joi.object().keys({
    title: Joi.string().min(3).max(500).required(),
    author: Joi.string().required(),
    description: Joi.string().required().min(3).max(2000),
    tags: Joi.array().optional().min(0).items(Joi.string().uppercase()),
    urlPdf: Joi.string().uri().required().max(200)
  }),
};
