import Joi from 'joi';

export const userSchema = Joi.object({
    firstname: Joi.string().min(2).max(30).required(),
    lastname: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    qrCode: Joi.string().optional(),
});

export const updateUserSchema = Joi.object({
    firstname: Joi.string().min(2).max(30).optional(),
    lastname: Joi.string().min(2).max(30).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    qrCode: Joi.string().optional(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});
