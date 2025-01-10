import prisma from '../../db.js';
export const getAll = async (sortBy = 'id', sortDirection = 'asc', page = 1, pageSize = 10, filters = {}) => {
    const skip = (page - 1) * pageSize;
    return prisma.enterprise.findMany({
        where: filters,
        orderBy: { [sortBy]: sortDirection },
        skip,
        take: pageSize,
    });
};

export const getById = async (id) => {
    return prisma.enterprise.findUnique({ where: { id } });
};

export const create = async (name, description, creator) => {
    return prisma.enterprise.create({ data: { name, description, creator } });
};

export const update = async (id, name, description, creator) => {
    return prisma.enterprise.update({ where: { id }, data: { name, description, creator } });
};

export const deleteById = async (id) => {
    return prisma.enterprise.delete({ where: { id } });
};

export const getEnterpriseStats = async (enterpriseId) => {
    const gyms = await prisma.gym.findMany({
        where: { enterpriseId },
        include: { subscriptions: true },
    });

    const totalGyms = gyms.length;
    const totalRevenue = gyms.reduce((sum, gym) => sum + gym.subscriptions.reduce((gymSum, sub) => gymSum + sub.price, 0), 0);

    return { totalGyms, totalRevenue };
};

export const getGymsByEnterprise = async (enterpriseId, page = 1, pageSize = 10) => {
    const skip = (page - 1) * pageSize;
    return prisma.gym.findMany({
        where: { enterpriseId },
        skip,
        take: pageSize,
        include: { subscriptions: true },
    });
};

export const toggleEnterpriseStatus = async (id, isActive) => {
    return prisma.enterprise.update({ where: { id }, data: { active: isActive } });
};

export const calculateGlobalStats = async () => {
    const enterprises = await prisma.enterprise.findMany({
        include: {
            gym: {
                include: {
                    subscriptions: true,
                },
            },
        },
    });

    return enterprises.map((enterprise) => ({
        enterpriseId: enterprise.id,
        name: enterprise.name,
        totalGyms: enterprise.gym.length,
        totalRevenue: enterprise.gym.reduce((sum, gym) => {
            return sum + gym.subscriptions.reduce((subSum, sub) => subSum + sub.price, 0);
        }, 0),
    }));
};


export const calculateEnterpriseTurnover = async (enterpriseId) => {
    const gyms = await prisma.gym.findMany({
        where: { enterpriseId },
        include: { subscriptions: true },
    });

    return gyms.reduce((sum, gym) => {
        return sum + gym.subscriptions.reduce((subSum, sub) => subSum + sub.price, 0);
    }, 0);
};

export const calculateGymAttendance = async (gymId) => {
    return prisma.stat.findMany({
        where: { gymId },
        select: {
            entryTime: true,
            exitTime: true,
        },
    });
};
