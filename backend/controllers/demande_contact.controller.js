const demandeContactService = require('../services/demande_contact.service');

// Envoyer une demande de contact à un artisan
const createDemandeContact = async (req, res) => {
    try {
        const { id_artisan } = req.params;
        const { objet, message } = req.body;
        const id_utilisateur = req.user.id_utilisateur;

        const nouvelleDemande = await demandeContactService.createDemandeContact(
            id_utilisateur,
            id_artisan,
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

// Récupérer les demandes envoyées par le particulier connecté
const getDemandesEnvoyees = async (req, res) => {
    try {
        const id_utilisateur = req.user.id_utilisateur;

        const demandes = await demandeContactService.getDemandesEnvoyees(
            id_utilisateur
        );

        return res.status(200).json(demandes);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Récupérer les demandes reçues par l'artisan connecté
const getDemandesRecues = async (req, res) => {
    try {
        const id_utilisateur = req.user.id_utilisateur;

        const demandes = await demandeContactService.getDemandesRecues(
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
    createDemandeContact,
    getDemandesEnvoyees,
    getDemandesRecues
};