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

module.exports = {
    registerUser,
    getUserProfile
};