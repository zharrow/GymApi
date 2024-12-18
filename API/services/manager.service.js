import prisma from '../../db.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import e from 'express';

export const getAll = async (sortBy, sortDirection) => {
    let options = {
        select: {
            id: true,
            firstname: true,
            lastname: true,
            gymId: true,
            gym: {
                select: {
                    id: true,
                    enterprise: true,
                    name: true,
                    location: true,
                    itinerary: true,
                    phoneNumber: true,
                    openingHour: true,
                    closingHour: true,
                }
            },
        }
    };

    if (sortBy) {
        options.orderBy = {
            [sortBy]: sortDirection || 'asc',
        };
    }
    return await prisma.manager.findMany(options);
};

export const getById = async (id) => {
    return await prisma.manager.findUnique({
        where: { id: parseInt(id) },
        select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            gymId: true,
        },
    });
};

export const deleteById = async (id) => {
    if (await getById(id)) {
        await prisma.manager.delete({
            where: { id: parseInt(id) },
        });
        return true;
    }
    return false;
};

export const create = async (email, password, firstname, lastname, gymId) => {

    const emailLowerCase = email.toLowerCase();
    const hashedPassword = bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT_ROUNDS));

    const data = {
        email: emailLowerCase, 
        password: hashedPassword,
        firstname,
        lastname,
        gymId,
    };

    return await prisma.manager.create({
        data,
        select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            gymId: true,
        },
    });
};

export const update = async (id, firstname, lastname, gymId) => {
    return await prisma.manager.update({
        where: { id: parseInt(id) },
        data: {
            firstname,
            lastname,
            gymId: gymId,
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            gymId: true,
        },
    });
};

export const login = async (email, password) => {
    const manager = await prisma.manager.findFirst({
        where: {
            email,
        },

    });
    if (!manager) throw new Error('Invalied email or password')
    if (!bcrypt.compareSync(password, manager.password)) throw new Error('Invalid email or password')

    return jwt.sign({ id: manager.id, email: manager.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
    
