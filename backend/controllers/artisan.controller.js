const {
    getAllArtisans: fetchAllArtisans,
    getArtisanById: fetchArtisanById,getArtisanProfileByUserId,
    createArtisanProfile: createArtisanProfileService,
    updateArtisanProfile: updateArtisanProfileService
} = require('../services/artisan.service');

// Récupération de tous les artisans avec filtres et pagination
const getAllArtisans = async (req, res) => {
    try {
        const artisans = await fetchAllArtisans(req.query);

        return res.status(200).json(artisans);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Récupération d'un artisan à partir de son identifiant
const getArtisanById = async (req, res) => {
    try {
        const artisan = await fetchArtisanById(req.params.id);

        return res.status(200).json(artisan);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Récupération de la fiche artisan du compte connecté
const getMyArtisanProfile = async (req, res) => {
    try {
        const artisan = await getArtisanProfileByUserId(
            req.user.id_utilisateur
        );

        return res.status(200).json(artisan);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Création de la fiche artisan du compte connecté
const createMyArtisanProfile = async (req, res) => {
    try {
        const artisan = await createArtisanProfileService(
            req.user.id_utilisateur,
            req.body
        );

        return res.status(201).json({
            message: 'Fiche professionnelle créée avec succès',
            artisan
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Modification de la fiche artisan du compte connecté
const updateMyArtisanProfile = async (req, res) => {
    try {
        const artisan = await updateArtisanProfileService(
            req.user.id_utilisateur,
            req.body
        );

        return res.status(200).json({
            message: 'Fiche professionnelle mise à jour avec succès',
            artisan
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllArtisans,
    getArtisanById,
    getMyArtisanProfile,
    createMyArtisanProfile,
    updateMyArtisanProfile
};
