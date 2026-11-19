const { Demande_support } = require('../models/associations');

// Créer une demande de support
const createDemandeSupport = async (id_utilisateur, objet, message) => {

    // Vérifier l'objet
    if (typeof objet !== 'string' || !objet.trim() || objet.trim().length > 125) {
        const error = new Error('Objet invalide (125 caractères maximum)');
        error.statusCode = 400;
        throw error;
    }

    // Vérifier le message
    if (typeof message !== 'string' || !message.trim() || message.trim().length > 800) {
        const error = new Error('Message invalide (800 caractères maximum)');
        error.statusCode = 400;
        throw error;
    }

    // Créer la demande
    const nouvelleDemande = await Demande_support.create({
        objet: objet.trim(),
        message: message.trim(),
        date_envoi: new Date(),
        id_utilisateur
    });

    return nouvelleDemande;
};

// Récupérer les demandes de support d'un utilisateur
const getDemandesSupport = async (id_utilisateur) => {

    const demandes = await Demande_support.findAll({
        where: { id_utilisateur },
        order: [['date_envoi', 'DESC']]
    });

    return demandes;
};

module.exports = {
    createDemandeSupport,
    getDemandesSupport
};