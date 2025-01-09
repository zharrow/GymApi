import { userBadgeSchema, updateUserBadgeSchema } from '../validators/userBadge.validator.js';
import { getAll, getById, deleteById, create, update } from '../services/userBadge.service.js';

export const getUserBadges = async (req, res, next) => {
    try {
        const data = await getAll(req.query.sortBy, req.query.sortDirection);
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const getUserBadgeById = async (req, res, next) => {
    try {
        const userBadge = await getById(parseInt(req.params.id));
        if (!userBadge) {
            const error = new Error('UserBadge not found');
            error.status = 404;
            throw error;
        }
        res.json({ success: true, data: userBadge });
    } catch (error) {
        next(error);
    }
};

export const createUserBadge = async (req, res, next) => {
    try {
        const { error } = userBadgeSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { userId, badgeId, date } = req.body;
        const userBadge = await create(userId, badgeId, date);
        res.json({
            success: true,
            message: `UserBadge created for user ${userId}`,
            data: userBadge,
        });
    } catch (error) {
        next(error);
    }
};

export const updateUserBadge = async (req, res, next) => {
    try {
        const { error } = updateUserBadgeSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { userId, badgeId, date } = req.body;
        const { id } = req.params;
        const userBadge = await update(id, userId, badgeId, date);
        res.json({ success: true, data: userBadge });
    } catch (error) {
        next(error);
    }
};

export const deleteUserBadgeById = async (req, res, next) => {
    try {
        const userBadgeId = parseInt(req.params.id);
        const userBadge = await getById(userBadgeId);

        if (!userBadge) {
            const error = new Error('UserBadge not found');
            error.status = 404;
            throw error;
        }

        const hasBeenDeleted = await deleteById(userBadgeId);

        if (!hasBeenDeleted) {
            const error = new Error('Failed to delete the userBadge');
            error.status = 500;
            throw error;
        }

        res.json({
            success: true,
            message: `UserBadge with id ${userBadgeId} deleted`,
        });
    } catch (error) {
        next(error);
    }
};
