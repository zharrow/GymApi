import prisma from '../../db.js';
import { assignBadgeToUser } from './badge.service.js';

export const getAll = async (sortBy, sortDirection) => {
    let options = {
        select: {
            id: true,
            userId: true,
            gymId: true,
            entryTime: true,
            exitTime: true,
        },
    };

    if (sortBy) {
        options.orderBy = {
            [sortBy]: sortDirection || 'asc',
        };
    }

    return await prisma.stat.findMany(options);
}

export const create = async (userId, gymId, entryTime, exitTime) => {

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const gym = await prisma.gym.findUnique({ where: { id: gymId } });

    if (!user || !gym) {
        throw new Error(`User or Gym not found: userId=${userId}, gymId=${gymId}`);
    }
    return await prisma.stat.create({
        data: {
            user: {
                connect: { id: userId }, // Connect an existing User
            },
            gym: {
                connect: { id: gymId }, // Connect an existing Gym
            },
            entryTime: new Date(entryTime), // Ensure proper DateTime format
            exitTime: exitTime ? new Date(exitTime) : null, // Optional exitTime
        },
        select: {
            id: true,
            userId: true,
            gymId: true,
            entryTime: true,
            exitTime: true,
        },
    });
};


export const update = async (id, userId, gymId, entryTime, exitTime) => {
    const stat = await prisma.stat.update({
        where: { id: parseInt(id) },
        data: {
            userId: userId,
            gymId: gymId,
            entryTime: entryTime,
            exitTime: exitTime,
        },
        select: {
            id: true,
            userId: true,
            gymId: true,
            entryTime: true,
            exitTime: true,
        },
    });
    return stat;
}

export const getById = async (id) => {
    return await prisma.stat.findUnique({
        where: { id: parseInt(id) },
        select: {
            id: true,
            userId: true,
            gymId: true,
            entryTime: true,
            exitTime: true,
        },
    });
}

export const deleteById = async (id) => {
    return await prisma.stat.delete({
        where: { id: parseInt(id) },
    });
}

export const checkAndAssignBadge = async (userId, badgeCriteria) => {
    const stats = await prisma.stat.count({
        where: {
            userId: parseInt(userId),
            ...badgeCriteria,
        },
    });

    if (stats >= 10) {
        const badge = await prisma.badge.findFirst({
            where: { name: "10 Entries" },
        });
        if (badge) {
            return await assignBadgeToUser(userId, badge.id);
        }
    }
    return null;
};