import { getAll, getById, deleteById, create } from '../services/stat.service.js';

export const getStats = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data,
    });
}

export const getStatById = async (req, res) => {
    const stat = await getById(parseInt(req.params.id));

    if (!stat) {
        return res.status(404).json({
            success: false,
            message: 'Stat not found',
        });
    }

    return res.json({
        success: true,
        data: stat,
    });
}

export const deleteStatById = async (req, res) => {
    const statId = parseInt(req.params.id);

    const stat = await getById(statId);
    if (!stat) {
        return res.status(404).json({
            success: false,
            message: 'Stat not found',
        });
    }

    const hasBeenDeleted = await deleteById(statId);
    if (!hasBeenDeleted) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete the stat',
        });
    }
    return res.json({
        success: true,
        message: `Stat with the id ${statId} deleted from the database`,
    });
}


export const createStat = async (req, res) => {
    const { userId, gymId, entryTime, exitTime } = req.body;

    // Validate request body
    if (!userId || !gymId || !entryTime) {
        return res.status(400).json({
            success: false,
            message: 'userId, gymId, and entryTime are required',
        });
    }

    try {
        const stat = await create(userId, gymId, entryTime, exitTime);
        return res.json({
            success: true,
            data: stat,
        });
    } catch (error) {
        console.error('Error in createStat:', error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const updateStat = async (req, res) => {
    const statId = parseInt(req.params.id);
    const { userId, badgeId } = req.body;

    const stat = await getById(statId);
    if (!stat) {
        return res.status(404).json({
            success: false,
            message: 'Stat not found',
        });
    }

    const updatedStat = await create(userId, badgeId, statId);
    return res.json({
        success: true,
        data: updatedStat,
    });
}

