const adminService = require('../services/admin.service');

// Récupérer la liste de tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await adminService.getAllUsers();

        return res.status(200).json(users);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Récupérer un utilisateur grâce à son identifiant
const getUserById = async (req, res) => {
    try {
        const { id_utilisateur } = req.params;
        const user = await adminService.getUserById(id_utilisateur);

        return res.status(200).json(user);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Récupérer les artisans en attente de validation
const getPendingArtisans = async (req, res) => {
    try {
        const artisans = await adminService.getPendingArtisans();

        return res.status(200).json(artisans);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Modifier le statut d'un artisan (validation ou refus)
const updateArtisanStatus = async (req, res) => {
    try {
        const { id_utilisateur } = req.params;
        const { nouveauStatut } = req.body;
        const id_admin = req.user.id_utilisateur;

        const artisan = await adminService.updateArtisanStatus(
            id_utilisateur,
            nouveauStatut,
            id_admin
        );

        return res.status(200).json(artisan);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};


// Modifier le statut d'un compte utilisateur
const updateUserStatus = async (req, res) => {
    try {
        const { id_utilisateur } = req.params;
        const { nouveauStatut } = req.body;
        const id_admin = req.user.id_utilisateur;  

        const user = await adminService.updateUserStatus(
            id_utilisateur,
            nouveauStatut,
            id_admin
            
        );

        return res.status(200).json(user);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Récupérer toutes les demandes de contact
const getAllContactRequests = async (req, res) => {
    try {
        const demandes = await adminService.getAllContactRequests();

        return res.status(200).json(demandes);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Récupérer toutes les demandes de support
const getAllSupportRequests = async (req, res) => {
    try {
        const demandes = await adminService.getAllSupportRequests();

        return res.status(200).json(demandes);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Récupérer tous les profils artisans
const getAllArtisans = async (req, res) => {
    try {
        const artisans = await adminService.getAllArtisans();

        return res.status(200).json(artisans);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getPendingArtisans,
    updateArtisanStatus,
    updateUserStatus,
    getAllContactRequests,
    getAllSupportRequests,
    getAllArtisans
};