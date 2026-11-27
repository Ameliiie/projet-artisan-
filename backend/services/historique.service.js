
const { Historique } = require('../models/associations');

// Enregistrement d'une action administrative
const createHistory = async (id_utilisateur, action, description) => {

    if (!id_utilisateur || !action) {
        const error = new Error('L’administrateur et l’action sont obligatoires');
        error.statusCode = 400;
        throw error;
    }

    const historique = await Historique.create({
        id_utilisateur,
        action,
        description: description || null
    });

    return historique;
};

// Récupération de l'historique complet
const getAllHistory = async () => {
    const historiques = await Historique.findAll({
        include: [
            {
                model: require('../models/associations').Utilisateur,
                attributes: ['id_utilisateur', 'nom', 'prenom', 'email']
            }
        ],
        order: [['date_action', 'DESC']]
    });

    return historiques;
};

module.exports = {
    createHistory,
    getAllHistory
};
