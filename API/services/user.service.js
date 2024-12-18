import prisma from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAll = async (sortBy, sortDirection) => {
    let options = {
        select: {
            id: true,
            firstname: true,
            lastname: true,
            // password: true,
            email: true,
            phone: true,
            qrCode: true,
            gymId: true,
            gym: {
                select: {
                    id: true,
                    name: true,
                    location: true,
                    itinerary: true,
                    phoneNumber: true,
                    enterprise: true,
                }
            },
        }
    };

    if (sortBy) {
        options.orderBy = {
            [sortBy]: sortDirection || 'asc',
        };
    }
    return await prisma.user.findMany(options);
};

export const getById = async (id) => {
    return await prisma.user.findUnique({
        where: { id: parseInt(id) },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
            qrCode: true,
            gymId: true,
        },
    });
};

export const deleteById = async (id) => {
    try {
        const user = await getById(id);
        if (!user) {
            return false;
        }
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        return true;
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        throw new Error("Erreur interne lors de la suppression.");
    }
};



export const create = async (firstname, lastname, email, password, phone, qrCode, gymId) => {

    const countUser = await prisma.user.count({
        where: {
            email: email,
        },
    });

    if (countUser > 0) throw new Error('User already exists with that email');

    const emailLowerCase = email.toLowerCase();
    const hashedPassword = bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT_ROUNDS));

    const data = {
        firstname,
        lastname,
        email: emailLowerCase,
        password: hashedPassword,
        phone,
        qrCode,
        ...(gymId !== undefined && { gymId }),
    };

    // console.log("Données envoyées à Prisma :", data);

    return await prisma.user.create({
        data,
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
        },
    });
};




export const update = async (id, firstname, lastname, email, phone, qrCode, gymId) => {
    const data = {
        ...(firstname && { firstname }),
        ...(lastname && { lastname }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(qrCode && { qrCode }),
        ...(gymId !== undefined && { gymId }),
    };

    return await prisma.user.update({
        where: { id: parseInt(id) },
        data,
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
            qrCode: true,
            gymId: true,
        },
    });
};


export const updatePassword = async (id, password) => {
    return await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
            password,
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
            qrCode: true,
            gymId: true,
        },
    });
}

export const login = async (email, password) => {
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    });
    if (!user) throw new Error('Invalid email or password');
    if (!bcrypt.compareSync(password, user.password)) throw new Error('Invalid email or password');
    
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// export const getQrCode = async (id, qrCode) => {
//     return await prisma.users.findUnique({
//         where: {
//             id,
//             qrCode,
//         },
//         select: {
//             qrCode: qrCode,
//         },
//     });
// }