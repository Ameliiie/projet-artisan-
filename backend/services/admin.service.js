const {
    Utilisateur,
    Artisan,
    Metier,
    Categorie,
    Demande_contact,
    Demande_support
} = require('../models/associations');
const { createHistory } = require('./historique.service');

// Récupération de la liste de tous les utilisateurs 

const getAllUsers = async () => { 
    const users = await Utilisateur.findAll({
        attributes: [
            'id_utilisateur',
            'nom',
            'prenom',
            'email',
            'role',
            'statut',
            'date_creation', 
            'photo'
        ],
        order:[['date_creation', 'DESC']]
    });

    return users;
};
// Récupération d'un utilisateur grâce à son identifiant 

const getUserById = async (id_utilisateur) => {
    const user = await Utilisateur.findByPk (id_utilisateur,{ 
        attributes:[
            'id_utilisateur',
            'nom', 
            'prenom', 
            'email', 
            'role',
            'statut',
            'date_creation',
            'photo'
        ]
    });

    if (!user) {
        const error = new Error('Utilisateur introuvable');
        error.statusCode = 404;
        throw error;
    }

    return user
};

//Récupération de la liste des artisans en attente de validation par l'administrateur
const getPendingArtisans = async () => {
    const artisans = await Utilisateur.findAll({
        where: {
            role: 'artisan',
            statut: 'en_attente'
        },
        attributes: [
            'id_utilisateur',
            'nom',
            'prenom',
            'email',
            'date_creation',
            'statut'
        ],
        order: [['date_creation', 'ASC']]
    });

    return artisans;
};

// Permettre à l'administrateur de valider ou refuser une demande 

// Modification du statut d'un artisan (validation ou refus de son inscription)

const updateArtisanStatus = async (id_utilisateur, nouveauStatut, id_admin) => {

    // Vérifier que le nouveau statut correspond à une décision autorisée (validation ou refus)
    if (!['actif', 'refuse'].includes(nouveauStatut)) {
        const error = new Error('Statut invalide.');
        error.statusCode = 400;
        throw error;
    }

    // Rechercher l'utilisateur grâce à son identifiant
    const artisan = await Utilisateur.findByPk(id_utilisateur);

    // Vérifier que l'utilisateur existe
    if (!artisan) {
        const error = new Error('Utilisateur introuvable.');
        error.statusCode = 404;
        throw error;
    }

    // Vérifier qu'il s'agit d'un artisan en attente de validation
    if (artisan.role !== 'artisan' || artisan.statut !== 'en_attente') {
        const error = new Error('Cet artisan ne possède pas de demande en attente.');
        error.statusCode = 400;
        throw error;
    }

    // Mettre à jour le statut de l'artisan
    artisan.statut = nouveauStatut;
    await artisan.save();

    // Déterminer l'action à enregistrer
    const action = nouveauStatut === 'actif'
        ? 'ARTISAN_VALIDE'
        : 'ARTISAN_REFUSE';

    // Préparer la description de l'action
    const description = `L'administrateur ${id_admin} a ${
        nouveauStatut === 'actif' ? 'validé' : 'refusé'
    } la demande de l'artisan ${id_utilisateur}.`;

    // Enregistrer l'action dans l'historique
    await createHistory(id_admin, action, description);

    return artisan;
};


const updateUserStatus = async (id_utilisateur, nouveauStatut, id_admin) => {

    // Rechercher l'utilisateur grâce à son identifiant
    const user = await Utilisateur.findByPk(id_utilisateur);

    // Vérifier que l'utilisateur existe
    if (!user) {
        const error = new Error('Utilisateur introuvable');
        error.statusCode = 404;
        throw error;
    }

    // Vérifier que le statut est autorisé
    if (!['actif', 'desactive'].includes(nouveauStatut)) {
        const error = new Error('Statut invalide');
        error.statusCode = 400;
        throw error;
    }

    // Vérifier que le compte est concerné par un changement de statut
    if (user.statut === nouveauStatut) {
        const error = new Error('Le compte possède déjà ce statut.');
        error.statusCode = 400;
        throw error;
    }

    // Modifier le statut du compte
    user.statut = nouveauStatut;

    // Enregistrer les modifications dans la base de données
    await user.save();

    // Déterminer l'action à enregistrer
    const action = nouveauStatut === 'desactive'
        ? 'COMPTE_DESACTIVE'
        : 'COMPTE_REACTIVE';

    // Préparer la description de l'action
    const description = `L'administrateur ${id_admin} a ${
        nouveauStatut === 'desactive' ? 'désactivé' : 'réactivé'
    } le compte de l'utilisateur ${id_utilisateur}.`;

    // Enregistrer l'action dans l'historique
    await createHistory(id_admin, action, description);

    return user;
};

// Récupération de toutes les demandes de contact pour l'administration
const getAllContactRequests = async () => {
    const demandes = await Demande_contact.findAll({
        include: [
            {
                model: Utilisateur,
                attributes: ['id_utilisateur', 'nom', 'prenom', 'email']
            },
            {
                model: Artisan,
                attributes: ['id_artisan', 'nom_entreprise', 'adresse_entreprise']
            }
        ],
        order: [['date_envoi', 'ASC']]
    });

    return demandes;
};

// Récupération de toutes les demandes de support pour l'administration
const getAllSupportRequests = async () => {
    const demandes = await Demande_support.findAll({
        include: [
            {
                model: Utilisateur,
                attributes: [
                    'id_utilisateur',
                    'nom',
                    'prenom',
                    'email',
                    'role'
                ]
            }
        ],
        order: [['date_envoi', 'ASC']]
    });

    return demandes;
};

// Récupération de tous les profils artisans pour l'administration
const getAllArtisans = async () => {
    const artisans = await Artisan.findAll({
        include: [
            {
                model: Utilisateur,
                attributes: [
                    'id_utilisateur',
                    'nom',
                    'prenom',
                    'email',
                    'role',
                    'statut'
                ]
            },
            {
                model: Metier,
                attributes: [
                    'id_metier',
                    'metier'
                ],
                include: [
                    {
                        model: Categorie,
                        attributes: [
                            'id_categorie',
                            'categorie'
                        ]
                    }
                ]
            }
        ],
        order: [['nom_entreprise', 'ASC']]
    });

    return artisans;
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