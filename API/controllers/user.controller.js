import { getAll, getById, deleteById, create, update, updatePassword, login } from '../services/user.service.js';

export const getUsers = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data,
    });
};

export const getUserById = async (req, res) => {
    const user = await getById(parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }

    return res.json({
        success: true,
        data: user,
    });
};

export const deleteUserById = async (req, res) => {
    const userId = parseInt(req.params.id);

    const user = await getById(userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }

    const name = `${user.firstname} ${user.lastname}`
    const email = `${user.email}`

    const hasBeenDeleted = await deleteById(userId);
    if (!hasBeenDeleted) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete the user',
        });
    }
    return res.json({
        success: true,
        message: `${name} with the email ${email} deleted from the database`,
    });
};

export const register = async (req, res, next) => {

    const { firstname, lastname, email, password, phone, qrCode } = req.body;
    let user;
    try {
        user = await create(firstname, lastname, email, password, phone, qrCode);
    } catch (error) {
        return next(error);
    }

    res.json({
        success: true,
        message: `${firstname} ${lastname} registered`,
        data: user,
    });
};

export const updateUser = async (req, res) => {
    const { firstname, lastname, email, phone, qrCode } = req.body;
    const { id } = req.params;

    const user = await update(id, firstname, lastname, email, phone, qrCode);

    res.json({
        success: true,
        data: user,
    });
};

export const updatePwd = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    const user = await updatePassword(id, password);

    res.json({
        success: true,
        data: user,
    });
} 

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body
    let token

    console.log("user controler token:" + token)

    if (!email || !password || email === '' || password === '') {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    try{
        token = await login(email, password)
        console.log("user controler into the try token:" + token)
    }
    catch (error) {
        return next(error)
    }
    res.json({
        success: true,
        message: 'Login successful',
        token
    });
}
