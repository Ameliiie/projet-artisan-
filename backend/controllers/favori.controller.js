const favoriService = require('../services/favori.service');

// Ajouter un artisan aux favoris
const addFavorite = async (req, res) => {
    try {
        const { id_artisan } = req.params;
        const id_utilisateur = req.user.id_utilisateur;

        const newFavorite = await favoriService.addFavorite(
            id_utilisateur,
            id_artisan
        );

        return res.status(201).json(newFavorite);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Récupérer les favoris du particulier connecté
const getFavorites = async (req, res) => {
    try {
        const id_utilisateur = req.user.id_utilisateur;

        const favorites = await favoriService.getFavorites(id_utilisateur);

        return res.status(200).json(favorites);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Supprimer un artisan des favoris
const removeFavorite = async (req, res) => {
    try {
        const { id_artisan } = req.params;
        const id_utilisateur = req.user.id_utilisateur;

        const result = await favoriService.removeFavorite(
            id_utilisateur,
            id_artisan
        );

        return res.status(200).json(result);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite
};