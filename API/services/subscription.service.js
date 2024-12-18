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
            gymAccess: true,
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
