const { Utilisateur } = require('../models/associations');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Retrouver le compte correspondant à l'adresse e-mail saisie.
const loginUser = async (email, mot_de_passe) => {
    const user = await Utilisateur.findOne({
        where: { email }
    });

    if (!user) {
        const error = new Error('Identifiants incorrects');
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(
        mot_de_passe,
        user.mot_de_passe
    );

    if (!isPasswordValid) {
        const error = new Error('Identifiants incorrects');
        error.statusCode = 401;
        throw error;
    }

    const payload = {
        id_utilisateur: user.id_utilisateur,
        role: user.role
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    return {
        token,
        user: {
            id_utilisateur: user.id_utilisateur,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = {
    loginUser
};