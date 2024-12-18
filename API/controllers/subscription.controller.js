import { getAll, getById, deleteById, create, update } from '../services/subscription.service.js';

export const getSubscriptions = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data,
    });
}

export const getSubscriptionById = async (req, res) => {
    const subscription = await getById(parseInt(req.params.id));

    if (!subscription) {
        return res.status(404).json({
            success: false,
            message: 'Subscription not found',
        });
    }

    return res.json({
        success: true,
        data: subscription,
    });
}

export const deleteSubscriptionById = async (req, res) => {
    const subscriptionId = parseInt(req.params.id);

    const subscription = await getById(subscriptionId);
    if (!subscription) {
        return res.status(404).json({
            success: false,
            message: 'Subscription not found',
        });
    }

    const hasBeenDeleted = await deleteById(subscriptionId);
    if (!hasBeenDeleted) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete the subscription',
        });
    }
    return res.json({
        success: true,
        message: `Subscription with the id ${subscriptionId} deleted from the database`,
    });
}

export const createSubscription = async (req, res) => {
    const { name, description, price, gymAccess } = req.body; // Corrige ici
    try {
        const subscription = await create(name, description, price, gymAccess);
        return res.json({
            success: true,
            data: subscription,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// userId, planId, startDate, endDate

export const updateSubscription = async (req, res) => {
    const subscriptionId = parseInt(req.params.id);
    const { name, description, price, gymAccess } = req.body;

    const subscription = await getById(subscriptionId);
    if (!subscription) {
        return res.status(404).json({
            success: false,
            message: 'Subscription not found',
        });
    }

    const updatedSubscription = await update(subscriptionId, name, description, price, gymAccess);
    if (!updatedSubscription) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update the subscription',
        });
    }
    return res.json({
        success: true,
        data: updatedSubscription,
    });
}