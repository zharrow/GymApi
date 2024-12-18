import prisma from '../../db.js';

export const getAll = async (options) => {
    return await prisma.userBadge.findMany(options);
}

export const create = async (userId, badgeId, date) => {
    const userBadge = await prisma.userBadge.create({
        data: {
            userId: userId,
            badgeId: badgeId,
            date: date,
        },
        select: {
            id: true,
            userId: true,
            badgeId: true,
            date: true,
        },
    });
    return userBadge;
}

export const update = async (id, userId, badgeId, date) => {
    const userBadge = await prisma.userBadge.update({
        where: { id: parseInt(id) },
        data: {
            userId: userId,
            badgeId: badgeId,
            date: date,
        },
        select: {
            id: true,
            userId: true,
            badgeId: true,
            date: true,
        },
    });
    return userBadge;
}

export const getById = async (id) => {
    return await prisma.userBadge.findUnique({
        where: { id: parseInt(id) },
        select: {
            id: true,
            userId: true,
            badgeId: true,
            date: true,
        },
    });
}

export const deleteById = async (id) => {
    return await prisma.userBadge.delete({
        where: { id: parseInt(id) },
    });
}

export const getByUserId = async (userId) => {
    return await prisma.userBadge.findMany({
        where: { userId: userId },
    });
}

