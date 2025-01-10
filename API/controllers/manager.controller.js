import { managerSchema, updateManagerSchema } from '../validators/manager.validator.js';
import { getAll, getById, deleteById, create, update } from '../services/manager.service.js';

export const getManagers = async (req, res, next) => {
    try {
        const data = await getAll(req.query.sortBy, req.query.sortDirection);
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const getManagersById = async (req, res, next) => {
    try {
        const manager = await getById(parseInt(req.params.id));
        if (!manager) {
            const error = new Error('Manager not found');
            error.status = 404;
            throw error;
        }
        res.json({ success: true, data: manager });
    } catch (error) {
        next(error);
    }
};

export const createManager = async (req, res, next) => {
    try {
        const { error } = managerSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { firstname, lastname, email, password, gymId } = req.body;
        const manager = await create(email, password, firstname, lastname, gymId);
        res.json({
            success: true,
            message: `Manager ${firstname} ${lastname} created`,
            data: manager,
        });
    } catch (error) {
        next(error);
    }
};

export const updateManager = async (req, res, next) => {
    try {
        const { error } = updateManagerSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { firstname, lastname, gymId } = req.body;
        const { id } = req.params;
        const manager = await update(id, firstname, lastname, gymId);
        res.json({ success: true, data: manager });
    } catch (error) {
        next(error);
    }
};

export const deleteManagersById = async (req, res, next) => {
    try {
        const managerId = parseInt(req.params.id);
        const manager = await getById(managerId);

        if (!manager) {
            const error = new Error('Manager not found');
            error.status = 404;
            throw error;
        }

        const firstname = manager.firstname;
        const lastname = manager.lastname;
        const hasBeenDeleted = await deleteById(managerId);

        if (!hasBeenDeleted) {
            const error = new Error('Failed to delete the manager');
            error.status = 500;
            throw error;
        }

        res.json({
            success: true,
            message: `Manager ${firstname} ${lastname} deleted`,
        });
    } catch (error) {
        next(error);
    }
};