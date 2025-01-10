import Joi from 'joi';

export const managerSchema = Joi.object({
    firstname: Joi.string().min(2).max(30).required(),
    lastname: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    gymId: Joi.number().integer().required(),
});

export const updateManagerSchema = Joi.object({
    firstname: Joi.string().min(2).max(30).optional(),
    lastname: Joi.string().min(2).max(30).optional(),
    gymId: Joi.number().integer().optional(),
});