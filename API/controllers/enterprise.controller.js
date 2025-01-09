import { enterpriseSchema, updateEnterpriseSchema } from '../validators/enterprise.validator.js';
import { getAll, getById, deleteById, create, update } from '../services/enterprise.service.js';

export const getEnterprises = async (req, res, next) => {
    try {
        const data = await getAll(req.query.sortBy, req.query.sortDirection);
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const getEnterpriseById = async (req, res, next) => {
    try {
        const enterprise = await getById(parseInt(req.params.id));
        if (!enterprise) {
            const error = new Error('Enterprise not found');
            error.status = 404;
            throw error;
        }
        res.json({ success: true, data: enterprise });
    } catch (error) {
        next(error);
    }
};

export const createEnterprise = async (req, res, next) => {
    try {
        const { error } = enterpriseSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { name, description, creator } = req.body;
        const enterprise = await create(name, description, creator);
        res.json({
            success: true,
            message: `Enterprise ${name} created`,
            data: enterprise,
        });
    } catch (error) {
        next(error);
    }
};

export const updateEnterprise = async (req, res, next) => {
    try {
        const { error } = updateEnterpriseSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { name, description, creator } = req.body;
        const { id } = req.params;
        const enterprise = await update(id, name, description, creator);
        res.json({ success: true, data: enterprise });
    } catch (error) {
        next(error);
    }
};

export const deleteEnterpriseById = async (req, res, next) => {
    try {
        const enterpriseId = parseInt(req.params.id);
        const enterprise = await getById(enterpriseId);

        if (!enterprise) {
            const error = new Error('Enterprise not found');
            error.status = 404;
            throw error;
        }

        const name = enterprise.name;
        const hasBeenDeleted = await deleteById(enterpriseId);

        if (!hasBeenDeleted) {
            const error = new Error('Failed to delete the enterprise');
            error.status = 500;
            throw error;
        }

        res.json({
            success: true,
            message: `Enterprise ${name} deleted`,
        });
    } catch (error) {
        next(error);
    }
};
