import prisma from '../../db.js';

export const getAll = async () => {
    return await prisma.subscription.findMany();
}

export const create = async (name, description, price, gymAccess) => {
    const subscription = await prisma.subscription.create({
        data: {
            name: name,
            description: description,
            price: price,
            gymAccess: gymAccess, // Assure-toi que c'est le bon nom de champ
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            gymAccess: true, // Idem ici
        },
    });
    return subscription;
};


export const update = async (id, name, description, price, gymAccess) => {
    const subscription = await prisma.subscription.update({
        where: { id: parseInt(id) },
        data: {
            name: name,
            description: description,
            price: price,
            gymAccess: gymAccess,
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            gymAccess: true,
        },
    });
    return subscription;
}

export const getById = async (id) => {
    return await prisma.subscription.findUnique({
        where: { id: parseInt(id) },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            gymAccess: true.toUpperCase(),
        },
    });
}

export const deleteById = async (id) => {
    return await prisma.subscription.delete({
        where: { id: parseInt(id) },
    });
}

export const getByUserId = async (userId) => {
    return await prisma.subscription.findMany({
        where: { userId: parseInt(userId) },
    });
}

export const assignSubscriptionToUser = async (userId, subscriptionId) => {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
    });
    if (!user) {
        throw new Error('User not found');
    }

    const subscription = await prisma.subscription.findUnique({
        where: { id: parseInt(subscriptionId) },
    });
    if (!subscription) {
        throw new Error('Subscription not found');
    }

    return await prisma.userSubscription.create({
        data: {
            userId: parseInt(userId),
            subscriptionId: parseInt(subscriptionId),
            startDate: new Date(),
            endDate: subscription.duration ? new Date(Date.now() + subscription.duration * 24 * 60 * 60 * 1000) : null,
        },
    });
};

export const updateSubscriptionForUser = async (userSubscriptionId, updates) => {
    const { startDate, endDate, subscriptionId } = updates;

    // Ensure subscription exists if changing
    if (subscriptionId) {
        const subscription = await prisma.subscription.findUnique({
            where: { id: parseInt(subscriptionId) },
        });
        if (!subscription) {
            throw new Error('Subscription not found');
        }
    }

    return await prisma.userSubscription.update({
        where: { id: parseInt(userSubscriptionId) },
        data: {
            ...(startDate && { startDate: new Date(startDate) }),
            ...(endDate && { endDate: new Date(endDate) }),
            ...(subscriptionId && { subscriptionId: parseInt(subscriptionId) }),
        },
    });
};

export const deleteSubscriptionForUser = async (userSubscriptionId) => {
    const userSubscription = await prisma.userSubscription.findUnique({
        where: { id: parseInt(userSubscriptionId) },
    });
    if (!userSubscription) {
        throw new Error('User subscription not found');
    }

    return await prisma.userSubscription.delete({
        where: { id: parseInt(userSubscriptionId) },
    });
};