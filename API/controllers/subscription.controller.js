import { subscriptionSchema, updateSubscriptionSchema } from '../validators/subscription.validator.js';
import { getAll, getById, deleteById, create, update } from '../services/subscription.service.js';

export const getSubscriptions = async (req, res, next) => {
    try {
        const data = await getAll(req.query.sortBy, req.query.sortDirection);
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await getById(parseInt(req.params.id));
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }
        res.json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

export const createSubscription = async (req, res, next) => {
    try {
        const { error } = subscriptionSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { name, description, price, gymAccess } = req.body;
        const subscription = await create(name, description, price, gymAccess);
        res.json({
            success: true,
            message: `Subscription ${name} created`,
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const { error } = updateSubscriptionSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { name, description, price, gymAccess } = req.body;
        const { id } = req.params;
        const subscription = await update(id, name, description, price, gymAccess);
        res.json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

export const deleteSubscriptionById = async (req, res, next) => {
    try {
        const subscriptionId = parseInt(req.params.id);
        const subscription = await getById(subscriptionId);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

        const name = subscription.name;
        const hasBeenDeleted = await deleteById(subscriptionId);

        if (!hasBeenDeleted) {
            const error = new Error('Failed to delete the subscription');
            error.status = 500;
            throw error;
        }

        res.json({
            success: true,
            message: `Subscription ${name} deleted`,
        });
    } catch (error) {
        next(error);
    }
};