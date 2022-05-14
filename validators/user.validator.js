const Joi = require('joi');

const createUserValidator = Joi.object({
    avatar: Joi.string(),

    email: Joi
        .string()
        .min(2)
        .max(20)
        .pattern(new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}'))
        .required()
        .trim(),

    password: Joi
        .string()
        .min(8)
        .max(20)
        .pattern(new RegExp('[0-9]'))
        .required()
        .trim(),

    rememberPassword: Joi
        .bool()
        .required(),

    country: Joi
        .string()
        .required(),

    sex: Joi
        .string()
        .required(),

    textarea: Joi
        .string()
        .min(10)
        .max(300)
        .required()
});

module.exports = {
    createUserValidator,
}
