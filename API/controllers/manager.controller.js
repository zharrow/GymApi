import { getAll, getById, deleteById, create, update } from '../services/manager.service.js';

export const getManagers = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data,
    });
};

export const getManagersById = async (req, res) => {
    const manager = await getById(parseInt(req.params.id));

    if (!manager) {
        return res.status(404).json({
            success: false,
            message: 'Manager not found',
        });
    }

    return res.json({
        success: true,
        data: manager,
    });
};

export const deleteManagersById = async (req, res) => {
    const managerId = parseInt(req.params.id);

    const manager = await getById(managerId);
    if (!manager) {
        return res.status(404).json({
            success: false,
            message: 'Manager not found',
        });
    }
    const firstname = manager.firstname;
    const lastname = manager.lastname;

    const hasBeenDeleted = await deleteById(managerId);
    if (!hasBeenDeleted) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete the manager',
        });
    }
    return res.json({
        success: true,
        message: `Manager ${firstname} ${lastname} deleted`,
    });
};

export const createManager = async (req, res) => {
    const { email, password, firstname, lastname, gymId } = req.body;

    const manager = await create(email, password, firstname, lastname, gymId);

    res.json({
        success: true,
        message: `Manager ${firstname, ' ', lastname} created`,
        data: manager,
    });
};

export const updateManager = async (req, res) => {
    const { firstname, lastname, gymId } = req.body;
    const { id } = req.params;

    const manager = await update(id, firstname, lastname, gymId);

    res.json({
        success: true,
        data: manager,
    });
};
