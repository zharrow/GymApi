import { getAll, getById, deleteById, create } from '../services/badge.service.js';

export const getBadges = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data,
    });
}

export const getBadgeById = async (req, res) => {
    const badge = await getById(parseInt(req.params.id));

    if (!badge) {
        return res.status(404).json({
            success: false,
            message: 'Badge not found',
        });
    }

    return res.json({
        success: true,
        data: badge,
    });
}

export const deleteBadgeById = async (req, res) => {
    const badgeId = parseInt(req.params.id);

    const badge = await getById(badgeId);
    if (!badge) {
        return res.status(404).json({
            success: false,
            message: 'Badge not found',
        });
    }

    const hasBeenDeleted = await deleteById(badgeId);
    if (!hasBeenDeleted) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete the badge',
        });
    }
    return res.json({
        success: true,
        message: `Badge with the id ${badgeId} deleted from the database`,
    });
}

export const createBadge = async (req, res) => {
    const { name, description, iconUrl, category, level } = req.body;
    let badge;
    try {
        badge = await create(name, description, iconUrl, category, level);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
    return res.json({
        success: true,
        data: badge,
    });
}

export const updateBadge = async (req, res) => {
    const badgeId = parseInt(req.params.id);
    const { name, description, image } = req.body;

    const badge = await getById(badgeId);
    if (!badge) {
        return res.status(404).json({
            success: false,
            message: 'Badge not found',
        });
    }

    const updatedBadge = await create(name, description, image);
    return res.json({
        success: true,
        data: updatedBadge,
    });
}


