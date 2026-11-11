const { Utilisateur } = require('../models/associations');
const bcrypt = require('bcrypt');

const registerUser = async (userData) => {
    const { nom, prenom, email, mot_de_passe, role } = userData;
    const nomNettoye = nom?.trim();
    const prenomNettoye = prenom?.trim();
    const emailNettoye = email?.trim();

    if (!nomNettoye || !prenomNettoye || !emailNettoye || !mot_de_passe || !role) {
        const error = new Error('Tous les champs obligatoires doivent être renseignés');
        error.statusCode = 400;
        throw error;
    }
    if (!['particulier', 'artisan'].includes(role)) {
    const error = new Error('Rôle invalide');
    error.statusCode = 400;
    throw error;
}

    // Vérification du format de l'adresse email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailNettoye)) {
        const error = new Error('Format d’adresse email invalide');
        error.statusCode = 400;
        throw error;
    }
    // Vérification de la longueur du mot de passe

    if (mot_de_passe.length < 8) {
        const error = new Error('Le mot de passe doit contenir au moins 8 caractères');
        error.statusCode = 400;
    throw error;
    }

    const existingUser = await Utilisateur.findOne({
        where: { email: emailNettoye }

    });

        if (existingUser) {
        const error = new Error('Cette adresse email est déjà utilisée');
        error.statusCode = 409;
        throw error;
    }
    

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const newUser = await Utilisateur.create({
    nom: nomNettoye,
    prenom: prenomNettoye,
    email: emailNettoye,
    mot_de_passe: hashedPassword,
    role
});

    return {
        id_utilisateur: newUser.id_utilisateur,
        nom: newUser.nom,
        prenom: newUser.prenom,
        email: newUser.email,
        role: newUser.role,
        date_creation: newUser.date_creation
    };

};
// Récupère les informations d'un utilisateur existant
const getUserProfile = async (id_utilisateur) => {
    const user = await Utilisateur.findByPk(id_utilisateur);

    if(!user) {
        const error= new Error('Utilisateur introuvable');
        error.statusCode= 404;
        throw error;
    }
    return {
        id_utilisateur: user.id_utilisateur,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        date_creation: user.date_creation,
        photo: user.photo

    };
};

// Modification des informations du profil utilisateur
const updateUserProfile = async (id_utilisateur, userData = {}) => {
    const user = await Utilisateur.findByPk(id_utilisateur);

    if (!user) {
        const error = new Error('Utilisateur introuvable');
        error.statusCode = 404;
        throw error;
    }

    // Prépare les nouvelles valeurs
    const updatedData = {};

    const allowedFields = [
        'nom',
        'prenom',
        'email',
        'photo'
    ];

    allowedFields.forEach((field) => {
        if (userData[field] !== undefined) {
            updatedData[field] = userData[field];
        }
    });

    // Vérifie qu'il y a des données à modifier
    if (Object.keys(updatedData).length === 0) {
        const error = new Error('Aucune donnée à modifier');
        error.statusCode = 400;
        throw error;
    }

    // Vérification des types
    for (const [field, value] of Object.entries(updatedData)) {
        if (value !== null && typeof value !== 'string') {
            const error = new Error(`Le champ ${field} doit être une chaîne de caractères`);
            error.statusCode = 400;
            throw error;
        }
    }

    // Vérification du nom et du prénom
    if (
        (updatedData.nom !== undefined &&
            (updatedData.nom === null || !updatedData.nom.trim())) ||
        (updatedData.prenom !== undefined &&
            (updatedData.prenom === null || !updatedData.prenom.trim()))
    ) {
        const error = new Error('Le nom et le prénom ne peuvent pas être vides');
        error.statusCode = 400;
        throw error;
    }

    // Vérification de l'email
    if (updatedData.email !== undefined) {
        if (updatedData.email === null || !updatedData.email.trim()) {
            const error = new Error('L’adresse email ne peut pas être vide');
            error.statusCode = 400;
            throw error;
        }
    }

    // Nettoyage des chaînes de caractères
    ['nom', 'prenom', 'email'].forEach((field) => {
        if (updatedData[field] !== undefined) {
            updatedData[field] = updatedData[field].trim();
        }
    });

    // Vérification du format de l'email
    if (updatedData.email !== undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(updatedData.email)) {
            const error = new Error('Format d’adresse email invalide');
            error.statusCode = 400;
            throw error;
        }
    }

    // Vérification de l'unicité de l'email
    if (updatedData.email) {
        const existingUser = await Utilisateur.findOne({
            where: { email: updatedData.email }
        });

        if (existingUser && existingUser.id_utilisateur !== user.id_utilisateur) {
            const error = new Error('Cette adresse email est déjà utilisée');
            error.statusCode = 409;
            throw error;
        }
    }

    // Vérification des longueurs maximales
    if (updatedData.nom && updatedData.nom.length > 100) {
        const error = new Error('Le nom ne doit pas dépasser 100 caractères');
        error.statusCode = 400;
        throw error;
    }

    if (updatedData.prenom && updatedData.prenom.length > 100) {
        const error = new Error('Le prénom ne doit pas dépasser 100 caractères');
        error.statusCode = 400;
        throw error;
    }

    if (updatedData.email && updatedData.email.length > 100) {
        const error = new Error('L’adresse email ne doit pas dépasser 100 caractères');
        error.statusCode = 400;
        throw error;
    }

    if (updatedData.photo && updatedData.photo.length > 255) {
        const error = new Error('Le chemin de la photo ne doit pas dépasser 255 caractères');
        error.statusCode = 400;
        throw error;
    }

    // Enregistrement des modifications
    await user.update(updatedData);

    // Retourne les informations mises à jour
    return {
        id_utilisateur: user.id_utilisateur,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        date_creation: user.date_creation,
        photo: user.photo
    };
};


module.exports = {
    registerUser,
    getUserProfile,
    updateUserProfile
};