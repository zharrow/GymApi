import { getAll, getById, deleteById, create, update, updatePassword, login } from '../services/user.service.js';
import { assignSubscriptionToUser, updateSubscriptionForUser, deleteSubscriptionForUser } from '../services/subscription.service.js';
import { userSchema, updateUserSchema, loginSchema } from '../validators/user.validator.js';


export const getUsers = async (req, res, next) => {
    try {
        const data = await getAll(req.query.sortBy, req.query.sortDirection);
        res.json({ success: true, data });
    } catch (error) {
        next(error); // Passe l'erreur au middleware
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await getById(parseInt(req.params.id));
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        res.json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

export const deleteUserById = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await getById(userId);

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        const name = `${user.firstname} ${user.lastname}`;
        const email = `${user.email}`;
        const hasBeenDeleted = await deleteById(userId);

        if (!hasBeenDeleted) {
            const error = new Error('Failed to delete the user');
            error.status = 500;
            throw error;
        }

        res.json({
            success: true,
            message: `${name} with the email ${email} deleted from the database`,
        });
    } catch (error) {
        next(error);
    }
};

export const register = async (req, res, next) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { firstname, lastname, email, password, phone, qrCode } = req.body;
        const user = await create(firstname, lastname, email, password, phone, qrCode);
        res.json({
            success: true,
            message: `${firstname} ${lastname} registered`,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};


export const updateUser = async (req, res, next) => {
    try {
        const { error } = updateUserSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { firstname, lastname, email, phone, qrCode } = req.body;
        const { id } = req.params;
        const user = await update(id, firstname, lastname, email, phone, qrCode);
        res.json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { email, password } = req.body;
        const token = await login(email, password);
        res.json({ success: true, message: 'Login successful', token });
    } catch (error) {
        next(error);
    }
};

export const updatePwd = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const user = await updatePassword(id, password);
        res.json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

export const assignSubscription = async (req, res, next) => {
    try {
        const { userId, subscriptionId } = req.body;
        if (!userId || !subscriptionId) {
            const error = new Error('userId and subscriptionId are required');
            error.status = 400;
            throw error;
        }

        const result = await assignSubscriptionToUser(userId, subscriptionId);
        res.json({
            success: true,
            message: `Subscription ${subscriptionId} assigned to user ${userId}`,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const { userSubscriptionId } = req.params;
        const updates = req.body;
        if (!userSubscriptionId || Object.keys(updates).length === 0) {
            const error = new Error('userSubscriptionId and at least one field to update are required');
            error.status = 400;
            throw error;
        }

        const result = await updateSubscriptionForUser(userSubscriptionId, updates);
        res.json({
            success: true,
            message: `Subscription ${userSubscriptionId} updated successfully`,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const { userSubscriptionId } = req.params;
        if (!userSubscriptionId) {
            const error = new Error('userSubscriptionId is required');
            error.status = 400;
            throw error;
        }

        const result = await deleteSubscriptionForUser(userSubscriptionId);
        res.json({
            success: true,
            message: `Subscription ${userSubscriptionId} deleted successfully`,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};