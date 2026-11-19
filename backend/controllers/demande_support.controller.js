const demandeSupportService = require('../services/demande_support.service');

// Envoyer une demande de support
const createDemandeSupport = async (req, res) => {
    try {
        const { objet, message } = req.body;
        const id_utilisateur = req.user.id_utilisateur;

        const nouvelleDemande = await demandeSupportService.createDemandeSupport(
            id_utilisateur,
            objet,
            message
        );

        return res.status(201).json(nouvelleDemande);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Récupérer les demandes de support de l'utilisateur connecté
const getDemandesSupport = async (req, res) => {
    try {
        const id_utilisateur = req.user.id_utilisateur;

        const demandes = await demandeSupportService.getDemandesSupport(
            id_utilisateur
        );

        return res.status(200).json(demandes);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

module.exports = {
    createDemandeSupport,
    getDemandesSupport
};