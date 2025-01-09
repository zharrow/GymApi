import prisma from '../../db.js';
/*
Get all enterprises with pagination, sorting and filtering
*/
export const getAll = async (sortBy = 'id', sortDirection = 'asc', page = 1, pageSize = 10, filters = {}) => {
    const skip = (page - 1) * pageSize;
    return prisma.enterprise.findMany({
        where: filters,
        orderBy: {
            [sortBy]: sortDirection,
        },
        skip,
        take: pageSize,
    });
};

export const getById = async (id) => {
    return prisma.enterprise.findUnique({
        where: { id: parseInt(id) },
    });
};

export const create = async (name, description, creator) => {
    return prisma.enterprise.create({
        data: {
            name,
            description,
            creator,
        },
    });
};

export const update = async (id, name, description, creator) => {
    return prisma.enterprise.update({
        where: { id: parseInt(id) },
        data: {
            name,
            description,
            creator,
        },
    });
};

export const deleteById = async (id) => {
    return prisma.enterprise.delete({
        where: { id: parseInt(id) },
    });
};

export const getEnterpriseStats = async (enterpriseId) => {
    const gyms = await prisma.gym.findMany({
        where: { enterpriseId: parseInt(enterpriseId) },
        include: {
            subscriptions: true,
        },
    });

    const totalGyms = gyms.length;
    const totalRevenue = gyms.reduce((sum, gym) => {
        return sum + gym.subscriptions.reduce((gymSum, sub) => gymSum + sub.price, 0);
    }, 0);

    return {
        totalGyms,
        totalRevenue,
    };
};

export const getGymsByEnterprise = async (enterpriseId, page = 1, pageSize = 10) => {
    const skip = (page - 1) * pageSize;
    return prisma.gym.findMany({
        where: { enterpriseId: parseInt(enterpriseId) },
        skip,
        take: pageSize,
        include: {
            subscriptions: true,
        },
    });
};

export const toggleEnterpriseStatus = async (id, isActive) => {
    return prisma.enterprise.update({
        where: { id: parseInt(id) },
        data: {
            active: isActive,
        },
    });
};