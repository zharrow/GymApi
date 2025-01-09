import { gymSchema, updateGymSchema } from '../validators/gym.validator.js';
import { getAll, getById, deleteById, create, update } from '../services/gym.service.js';

export const getGyms = async (req, res, next) => {
    try {
        const data = await getAll(req.query.sortBy, req.query.sortDirection);
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const getGymById = async (req, res, next) => {
    try {
        const gym = await getById(parseInt(req.params.id));
        if (!gym) {
            const error = new Error('Gym not found');
            error.status = 404;
            throw error;
        }
        res.json({ success: true, data: gym });
    } catch (error) {
        next(error);
    }
};

export const createGym = async (req, res, next) => {
    try {
        const { error } = gymSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { name, location, itinerary, phoneNumber, openingHour, closingHour, creationDate } = req.body;
        const gym = await create(name, location, itinerary, phoneNumber, openingHour, closingHour, creationDate);
        res.json({
            success: true,
            message: `Gym ${name} created at ${location}`,
            data: gym,
        });
    } catch (error) {
        next(error);
    }
};

export const updateGym = async (req, res, next) => {
    try {
        const { error } = updateGymSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }

        const { name, location, itinerary, phoneNumber, openingHour, closingHour, creationDate } = req.body;
        const { id } = req.params;
        const gym = await update(id, name, location, itinerary, phoneNumber, openingHour, closingHour, creationDate);
        res.json({
            success: true,
            message: `Gym ${name} updated`,
            data: gym,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteGymById = async (req, res, next) => {
    try {
        const gymId = parseInt(req.params.id);
        const gym = await getById(gymId);

        if (!gym) {
            const error = new Error('Gym not found');
            error.status = 404;
            throw error;
        }

        const name = gym.name;
        const hasBeenDeleted = await deleteById(gymId);

        if (!hasBeenDeleted) {
            const error = new Error('Failed to delete the gym');
            error.status = 500;
            throw error;
        }

        res.json({
            success: true,
            message: `Gym ${name} deleted`,
        });
    } catch (error) {
        next(error);
    }
};