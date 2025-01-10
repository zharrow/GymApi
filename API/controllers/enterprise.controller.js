import { getAll, getById, create, update, deleteById, getEnterpriseStats, getGymsByEnterprise, toggleEnterpriseStatus, calculateGlobalStats, calculateEnterpriseTurnover, calculateGymAttendance } from '../services/enterprise.service.js';


export const getEnterprises = async (req, res, next) => {
    try {
        const { sortBy = 'id', sortDirection = 'asc', page = 1, pageSize = 10, filters = {} } = req.query;

        const parsedPage = parseInt(page, 10) || 1;
        const parsedPageSize = parseInt(pageSize, 10) || 10;

        if (parsedPageSize <= 0) {
            const error = new Error('pageSize must be greater than 0');
            error.status = 400;
            throw error;
        }

        const data = await getAll(sortBy, sortDirection, parsedPage, parsedPageSize, filters);
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};


export const getEnterpriseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            const error = new Error('Enterprise ID is required');
            error.status = 400;
            throw error;
        }

        const enterprise = await getById(parseInt(id));
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
        const { name, description, creator } = req.body;
        const enterprise = await create(name, description, creator);
        res.json({ success: true, message: `Enterprise ${name} created`, data: enterprise });
    } catch (error) {
        next(error);
    }
};

export const updateEnterprise = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, creator } = req.body;
        const enterprise = await update(parseInt(id), name, description, creator);
        res.json({ success: true, data: enterprise });
    } catch (error) {
        next(error);
    }
};

export const deleteEnterpriseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const enterprise = await getById(parseInt(id));

        if (!enterprise) {
            const error = new Error('Enterprise not found');
            error.status = 404;
            throw error;
        }

        await deleteById(parseInt(id));
        res.json({ success: true, message: `Enterprise ${enterprise.name} deleted` });
    } catch (error) {
        next(error);
    }
};

export const getEnterpriseStatistics = async (req, res, next) => {
    try {
        const { enterpriseId } = req.params;
        const stats = await getEnterpriseStats(parseInt(enterpriseId));
        res.json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};

export const getGymsByEnterprises = async (req, res, next) => {
    try {
        const { enterpriseId, page, pageSize } = req.params;
        const gyms = await getGymsByEnterprise(parseInt(enterpriseId), parseInt(page), parseInt(pageSize));
        res.json({ success: true, data: gyms });
    } catch (error) {
        next(error);
    }
};

export const toggleEnterprisesStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        const enterprise = await toggleEnterpriseStatus(parseInt(id), isActive);
        res.json({ success: true, data: enterprise });
    } catch (error) {
        next(error);
    }
};


export const getGlobalStats = async (req, res, next) => {
    try {
        const stats = await calculateGlobalStats();
        res.json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};

export const getEnterpriseTurnover = async (req, res, next) => {
    try {
        const { enterpriseId } = req.params;
        const turnover = await calculateEnterpriseTurnover(parseInt(enterpriseId));
        res.json({ success: true, data: { turnover } });
    } catch (error) {
        next(error);
    }
};

export const getGymAttendance = async (req, res, next) => {
    try {
        const { gymId } = req.params;
        const attendance = await calculateGymAttendance(parseInt(gymId));
        res.json({ success: true, data: attendance });
    } catch (error) {
        next(error);
    }
};
