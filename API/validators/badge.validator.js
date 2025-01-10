import Joi from 'joi';

export const badgeSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(500).optional(),
    iconUrl: Joi.string().uri().optional(),
    category: Joi.string().max(30).optional(),
    level: Joi.number().integer().min(1).max(10).optional(),
});

export const updateBadgeSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    description: Joi.string().max(500).optional(),
    iconUrl: Joi.string().uri().optional(),
    category: Joi.string().max(30).optional(),
    level: Joi.number().integer().min(1).max(10).optional(),
});