import prisma from '../../db.js';

export const getAll = async (sortBy, sortDirection) => {
    let options = {
        select: {
            id: true,
            name: true,
            location: true,
            itinerary: true,
            phoneNumber: true,
            openingHour: true,
            closingHour: true,
            creationDate: true,
            enterprise: true
        },
    };
    if (sortBy) {
        options.orderBy = {
            [sortBy]: sortDirection || 'asc',
        };
    }
    return await prisma.gym.findMany(options);
};

export const getById = async (id) => {
    return await prisma.gym.findUnique({
        where: { id: parseInt(id) },
        select: {
            id: true,
            name: true,
            location: true,
            itinerary: true,
            phoneNumber: true,
            openingHour: true,
            closingHour: true,
            creationDate: true,
            enterprise: true
        },
    });
};

export const deleteById = async (id) => {
    if (await getById(id)) {
        await prisma.gym.delete({
            where: { id: parseInt(id) },
        });
        return true;
    }
    return false;
};

export const create = async (name, location, itinerary, phoneNumber, openingHour, closingHour, enterpriseId) => {
    console.log({ enterpriseId }); 
    if (!enterpriseId) {
        throw new Error('Enterprise ID is required');
    }

    const enterprise = await prisma.enterprise.findUnique({
        where: { id: enterpriseId },
    });

    if (!enterprise) {
        throw new Error('Enterprise not found');
    }

    return await prisma.gym.create({
        data: {
            name,
            location,
            itinerary,
            phoneNumber,
            openingHour,
            closingHour,
            enterpriseId,
        },
        select: {
            id: true,
            name: true,
            location: true,
            creationDate: true,
        },
    });
};



export const update = async (id, name, location, itinerary, phoneNumber, openingHour, closingHour, creationDate, enterpriseId = null) => {
    return await prisma.gym.update({
        where: { id: parseInt(id) },
        data: {
            name: name,
            location: location,
            itinerary: itinerary,
            phoneNumber: phoneNumber,
            openingHour: openingHour,
            closingHour: closingHour,
            creationDate: creationDate,
            enterpriseId: enterpriseId,
        },
        select: {
            id: true,
            name: true,
            location: true,
            itinerary: true,
            phoneNumber: true,
            openingHour: true,
            closingHour: true,
            creationDate: true,
            enterpriseId: true,
        },
    });
};

export const calculateTurnover = async (id) => {
    const gym = await getById(id);
    if (!gym) {
        return null;
    }
    const subscriptions = await prisma.subscription.findMany({
        where: { gymId: gym.id },
        select: {
            price: true,
        },
    });
    return subscriptions.reduce((acc, subscription) => acc + subscription.price, 0);
}