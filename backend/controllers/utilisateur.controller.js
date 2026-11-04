const { registerUser } = require('../services/utilisateur.service');

const createUser = async (req, res) => {
    try {
        const newUser = await registerUser(req.body);

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: newUser
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
        message: error.message
        });
    }
};

module.exports = {
    createUser
};