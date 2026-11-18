const { Demande_contact, Artisan, Utilisateur } = require('../models/associations');

// Envoyer une demande de contact à un artisan
const createDemandeContact = async (id_utilisateur, id_artisan, objet, message) => {

    // Vérifier que l'artisan existe
    const artisan = await Artisan.findByPk(id_artisan);

    if (!artisan) {
        const error = new Error('Artisan introuvable');
        error.statusCode = 404;
        throw error;
    }

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

    // Créer la demande de contact
    const nouvelleDemande = await Demande_contact.create({
        objet: objet.trim(),
        message: message.trim(),
        date_envoi: new Date(),
        id_utilisateur,
        id_artisan
    });

    return nouvelleDemande;
};

// Récupérer les demandes envoyées par un particulier
const getDemandesEnvoyees = async (id_utilisateur) => {
    const demandes = await Demande_contact.findAll({
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
        order: [['date_envoi', 'DESC']]
    });

    return demandes;
};

// Récupérer les demandes reçues par un artisan
const getDemandesRecues = async (id_utilisateur) => {

    // Retrouver le profil artisan associé au compte connecté
    const artisan = await Artisan.findOne({
        where: {
            id_utilisateur
        }
    });

    if (!artisan) {
        const error = new Error('Profil artisan introuvable');
        error.statusCode = 404;
        throw error;
    }

    // Récupérer les demandes destinées à cet artisan
    const demandes = await Demande_contact.findAll({
        where: {
            id_artisan: artisan.id_artisan
        },
        include: [
            {
                model: Utilisateur,
                attributes: ['nom', 'prenom', 'photo']
            }
        ],
        order: [['date_envoi', 'DESC']]
    });

    return demandes;
};

module.exports = {
    createDemandeContact,
    getDemandesEnvoyees,
    getDemandesRecues
};
