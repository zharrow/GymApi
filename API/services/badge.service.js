import prisma from '../../db.js';

export const getAll = async (sortBy, sortDirection) => {
    let options = {
        select: {
            id: true,
            name: true,
            description: true,
            iconUrl: true,
            category: true,
            level: true,
        },
    };

    if (sortBy) {
        options.orderBy = {
            [sortBy]: sortDirection || 'asc',
        };
    }

    return await prisma.badge.findMany(options);
}

export const create = async (name, description, iconUrl, category, level) => {
    const badge = await prisma.badge.create({
        data: {
            name: name,
            description: description,
            iconUrl: iconUrl,
            category: category,
            level: level,
        },
        select: {
            id: true,
            name: true,
            description: true,
            iconUrl: true,
            category: true,
            level: true,
        },
    });
    return badge;
}

export const update = async (id, name, description, iconUrl, category, level) => {
    const badge = await prisma.badge.update({
        where: { id: parseInt(id) },
        data: {
            name: name,
            description: description,
            iconUrl: iconUrl,
            category: category,
            level: level,
        },
        select: {
            id: true,
            name: true,
            description: true,
            iconUrl: true,
            category: true,
            level: true,
        },
    });
    return badge;
}

export const getById = async (id) => {
    return await prisma.badge.findUnique({
        where: { id: parseInt(id) },
        select: {
            id: true,
            name: true,
            description: true,
            iconUrl: true,
            category: true,
            level: true,
        },
    });
}

export const deleteById = async (id) => {
    if (await getById(id)) {
        await prisma.badge.delete({
            where: { id: parseInt(id) },
        });
        return true;
    }
    return false;
}

export const assignBadgeToUser = async (userId, badgeId) => {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
    });
    if (!user) {
        throw new Error('User not found');
    }

    const badge = await prisma.badge.findUnique({
        where: { id: parseInt(badgeId) },
    });
    if (!badge) {
        throw new Error('Badge not found');
    }

    return await prisma.userBadge.create({
        data: {
            userId: parseInt(userId),
            badgeId: parseInt(badgeId),
            earnedDate: new Date(),
        },
    });
};