import { badgeSchema, updateBadgeSchema } from '../validators/badge.validator.js';
import { getAll, getById, deleteById, create, update } from '../services/badge.service.js';

export const getBadges = async (req, res, next) => {
    try {
        const data = await getAll(req.query.sortBy, req.query.sortDirection);
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const getBadgeById = async (req, res, next) => {
    try {
        const badge = await getById(parseInt(req.params.id));
        if (!badge) {
            const error = new Error('Badge not found');
            error.status = 404;
            throw error;
        }
        res.json({ success: true, data: badge });
    } catch (error) {
        next(error);
    }
};

export const createBadge = async (req, res, next) => {
    try {
        const { error } = badgeSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { name, description, iconUrl, category, level } = req.body;
        const badge = await create(name, description, iconUrl, category, level);
        res.json({
            success: true,
            message: `Badge ${name} created`,
            data: badge,
        });
    } catch (error) {
        next(error);
    }
};

export const updateBadge = async (req, res, next) => {
    try {
        const { error } = updateBadgeSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { name, description, iconUrl, category, level } = req.body;
        const { id } = req.params;
        const badge = await update(id, name, description, iconUrl, category, level);
        res.json({ success: true, data: badge });
    } catch (error) {
        next(error);
    }
};

export const deleteBadgeById = async (req, res, next) => {
    try {
        const badgeId = parseInt(req.params.id);
        const badge = await getById(badgeId);

        if (!badge) {
            const error = new Error('Badge not found');
            error.status = 404;
            throw error;
        }

        const name = badge.name;
        const hasBeenDeleted = await deleteById(badgeId);

        if (!hasBeenDeleted) {
            const error = new Error('Failed to delete the badge');
            error.status = 500;
            throw error;
        }

        res.json({
            success: true,
            message: `Badge ${name} deleted`,
        });
    } catch (error) {
        next(error);
    }
};
