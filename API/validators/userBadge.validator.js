import Joi from 'joi';

export const userBadgeSchema = Joi.object({
    userId: Joi.number().integer().required(),
    badgeId: Joi.number().integer().required(),
    date: Joi.date().optional(),
});

export const updateUserBadgeSchema = Joi.object({
    userId: Joi.number().integer().optional(),
    badgeId: Joi.number().integer().optional(),
    date: Joi.date().optional(),
});