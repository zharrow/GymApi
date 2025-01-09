import Joi from 'joi';

export const enterpriseSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(500).optional(),
    creator: Joi.string().email().required(),
});

export const updateEnterpriseSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    description: Joi.string().max(500).optional(),
    creator: Joi.string().email().optional(),
});