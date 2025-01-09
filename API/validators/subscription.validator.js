import Joi from 'joi';

export const subscriptionSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(500).optional(),
    price: Joi.number().positive().required(),
    gymAccess: Joi.string(),
});

export const updateSubscriptionSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    description: Joi.string().max(500).optional(),
    price: Joi.number().positive().optional(),
    gymAccess: Joi.string(),
});