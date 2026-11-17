
const { Favori, Artisan, Utilisateur } = require('../models/associations');

// Ajouter un artisan aux favoris
const addFavorite = async (id_utilisateur, id_artisan) => {
    // Vérifier que l'artisan existe
    const artisan = await Artisan.findByPk(id_artisan);

    if (!artisan) {
        const error = new Error('Artisan introuvable');
        error.statusCode = 404;
        throw error;
    }

    // Vérifier si l'artisan est déjà dans les favoris
    const existingFavorite = await Favori.findOne({
        where: {
            id_utilisateur,
            id_artisan
        }
    });

    if (existingFavorite) {
        const error = new Error('Cet artisan est déjà dans vos favoris');
        error.statusCode = 409;
        throw error;
    }

    // Créer le favori
    const newFavorite = await Favori.create({
        id_utilisateur,
        id_artisan
    });

    return newFavorite;
};

// Récupérer les favoris du particulier connecté
const getFavorites = async (id_utilisateur) => {
    const favorites = await Favori.findAll({
        where: {
            id_utilisateur
        },
        include: [
            {
                model: Artisan,
                include: [
                    {
                        model: Utilisateur,
                        attributes: ['nom', 'prenom', 'photo']
                    }
                ]
            }
        ],
        order: [['id_favori', 'DESC']]
    });

    return favorites;
};

// Supprimer un artisan des favoris
const removeFavorite = async (id_utilisateur, id_artisan) => {
    const favorite = await Favori.findOne({
        where: {
            id_utilisateur,
            id_artisan
        }
    });

    if (!favorite) {
        const error = new Error('Favori introuvable');
        error.statusCode = 404;
        throw error;
    }

    await favorite.destroy();

    return { message: 'Favori supprimé avec succès' };
};

module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite
};
