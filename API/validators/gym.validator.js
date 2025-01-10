import Joi from 'joi';

export const gymSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    location: Joi.string().max(100).required(),
    itinerary: Joi.string().optional(),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    openingHour: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    closingHour: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    creationDate: Joi.date().optional(),
    enterpriseId: Joi.number().required(),
});

export const updateGymSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    location: Joi.string().max(100).optional(),
    itinerary: Joi.string().optional(),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    openingHour: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    closingHour: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    creationDate: Joi.date().optional(),
    enterpriseId: Joi.number().optional(),
});