const Utilisateur = require('../models/Utilisateur');
const { registerUser, getUserProfile, updateUserProfile } = require('../services/utilisateur.service');

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
// récupère l'identifiant et appelle le service.
const getMyProfile = async (req, res) => {
    try {
        const id_utilisateur = req.user.id_utilisateur;

        const user = await getUserProfile(id_utilisateur);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Modifie le profil de l'utilisateur connecté
const updateMyProfile = async (req, res) => {
    try {
        const id_utilisateur = req.user.id_utilisateur;

        const updatedUser = await updateUserProfile(id_utilisateur, req.body);

        return res.status(200).json({
            message: 'Profil modifié avec succès',
            user: updatedUser
        });

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

module.exports = {
    createUser, 
    getMyProfile, 
    updateMyProfile
};