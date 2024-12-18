import prisma from '../../db.js';

export const getAll = async (sortBy, sortDirection) => {
    const validSortFields = ['id', 'name', 'description', 'creator'];
    if (sortBy && !validSortFields.includes(sortBy)) {
        throw new Error('Invalid field to sort by');
    }

    let options = {
        select: {
            id: true,
            name: true,
            description: true,
            creator: true,
            gyms: {
                select: {
                    id: true,
                    name: true,
                    location: true,
                }
            }
        },
    };

    if (sortBy) {
        options.orderBy = {
            [sortBy]: sortDirection || 'asc',
        };
    }

    return await prisma.enterprise.findMany(options);
};




export const getById = async (id) => {
    return await prisma.enterprise.findUnique({
        where: { id: parseInt(id) },
        select: {
            id: true,
            name: true,
            description: true,
            creator: true,
            gym: {
                select: {
                    id: true,
                    name: true,
                    location: true,
                }
            }
        },
    });
};


export const deleteById = async (id) => {
    if (await getById(id)) {
        await prisma.enterprise.delete({
            where: { id: parseInt(id) },
        });
        return true;
    }
    return false;
};



export const create = async (name, description, creator, gymId = null) => {
    const enterprise = await prisma.enterprise.create({
        data: {
            name: name,
            description: description,
            creator: creator,
            gymId: gymId ? parseInt(gymId) : null,
        },
        select: { id: true, name: true },
    });
    return enterprise;
};



export const update = async (id, name, description, creator, gymId = null) => {
    const enterprise = await prisma.enterprise.update({
        where: { id: parseInt(id) },
        data: {
            name: name,
            description: description,
            creator: creator,
            gymId: gymId ? parseInt(gymId) : null,
        },
        select: { id: true, name: true },
    });
    return enterprise;
};

