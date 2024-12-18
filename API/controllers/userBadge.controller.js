import { getAll, getById, deleteById, create, update } from '../services/userBadge.service.js';

export const getUserBadges = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data,
    });
}

export const getUserBadgeById = async (req, res) => {
    const userBadge = await getById(parseInt(req.params.id));

    if (!userBadge) {
        return res.status(404).json({
            success: false,
            message: 'UserBadge not found',
        });
    }

    return res.json({
        success: true,
        data: userBadge,
    });
}

export const deleteUserBadgeById = async (req, res) => {
    const userBadgeId = parseInt(req.params.id);

    const userBadge = await getById(userBadgeId);
    if (!userBadge) {
        return res.status(404).json({
            success: false,
            message: 'UserBadge not found',
        });
    }

    const hasBeenDeleted = await deleteById(userBadgeId);
    if (!hasBeenDeleted) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete the userBadge',
        });
    }
    return res.json({
        success: true,
        message: `UserBadge with the id ${userBadgeId} deleted from the database`,
    });
}

export const createUserBadge = async (req, res) => {
    const { userId, badgeId } = req.body;
    let userBadge;
    try {
        userBadge = await create(userId, badgeId);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
    return res.json({
        success: true,
        data: userBadge,
    });
}

