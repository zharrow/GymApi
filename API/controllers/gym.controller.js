import { getAll, getById, deleteById, create, update } from '../services/gym.service.js';

export const getGyms = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data,
    });
};

export const getGymById = async (req, res) => {
    const gym = await getById(parseInt(req.params.id));

    if (!gym) {
        return res.status(404).json({
            success: false,
            message: 'Gym not found',
        });
    }

    return res.json({
        success: true,
        data: gym,
    });
};

export const deleteGymById = async (req, res) => {
    const gymId = parseInt(req.params.id);

    const gym = await getById(gymId);
    if (!gym) {
        return res.status(404).json({
            success: false,
            message: 'Enterprise not found',
        });
    }
    const name = gym.name;

    const hasBeenDeleted = await deleteById(gymId);
    if (!hasBeenDeleted) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete the enterprise',
        });
    }
    return res.json({
        success: true,
        message: `Enterprise ${name} deleted`,
    });
};

export const createGym = async (req, res) => {
    const { name, location, itinerary, phoneNumber, openingHour, closingHour, creationDate } = req.body;

    const enterprise = await create(name, location, itinerary, phoneNumber, openingHour, closingHour, creationDate);

    res.json({
        success: true,
        message: `Gym ${name} at ${location} created`,
        data: enterprise,
    });
};

export const updateGym = async (req, res) => {
    const { name, location, itinerary, phoneNumber, openingHour, closingHour, creationDate } = req.body;
    const { id } = req.params;

    const enterprise = await update(id, name, location, itinerary, phoneNumber, openingHour, closingHour, creationDate);

    res.json({
        success: true,
        message: `Enterprise ${name} updated`,	
        data: enterprise,
    });
};
