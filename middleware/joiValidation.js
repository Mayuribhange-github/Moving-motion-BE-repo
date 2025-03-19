import Joi from 'joi';
export const validation = Joi.object({
    name: Joi.string().alphanum().min(3).max(25).trim(true),
    contact: Joi.number().integer(),
    email: Joi.string().email(),
    // contact: Joi.number().integer(),
});
