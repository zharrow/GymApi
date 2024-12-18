import { getAll, getById, deleteById, create, update } from '../services/enterprise.service.js';

export const getEnterprises = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data,
    });
};

export const getEnterpriseById = async (req, res) => {
    const enterprise = await getById(parseInt(req.params.id));

    if (!enterprise) {
        return res.status(404).json({
            success: false,
            message: 'Enterprise not found',
        });
    }

    return res.json({
        success: true,
        data: enterprise,
    });
};

export const deleteEnterpriseById = async (req, res) => {
    const enterpriseId = parseInt(req.params.id);

    const enterprise = await getById(enterpriseId);
    if (!enterprise) {
        return res.status(404).json({
            success: false,
            message: 'Enterprise not found',
        });
    }
    const name = enterprise.name;

    const hasBeenDeleted = await deleteById(enterpriseId);
    if (!hasBeenDeleted) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete the enterprise',
        });
    }
    return res.json({
        success: true,
        message: `Enterprise ${name} deleted`,
    });
};

export const createEnterprise = async (req, res) => {
    const { name, description, creator } = req.body;

    const enterprise = await create(name, description, creator);

    res.json({
        success: true,
        message: `Enterprise ${name} created`,
        data: enterprise,
    });
};

export const updateEnterprise = async (req, res) => {
    const { name, description, creator } = req.body;
    const { id } = req.params;

    const enterprise = await update(id, name, description, creator);

    res.json({
        success: true,
        data: enterprise,
    });
};
