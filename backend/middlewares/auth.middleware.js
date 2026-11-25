
const jwt = require('jsonwebtoken');
const { Utilisateur } = require('../models/associations');

const authenticateToken = async (req, res, next) => {
    // Récupérer l'en-tête Authorization
    const authHeader = req.headers.authorization;

    // Extraire le token Bearer
    const token = authHeader && authHeader.split(' ')[1];

    // Vérifier la présence du token
    if (!token) {
        return res.status(401).json({
            message: 'Authentification requise.'
        });
    }

    try {
        // Vérifier la validité du JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Vérifier que l'utilisateur existe
        const user = await Utilisateur.findByPk(decoded.id_utilisateur);

        if (!user) {
            return res.status(401).json({
                message: 'Utilisateur introuvable.'
            });
        }

        // Vérifier que le compte est actif
        if (user.statut !== 'actif') {
            return res.status(403).json({
                message: 'Votre compte est désactivé ou en attente de validation.'
            });
        }

        // Transmettre les informations de l'utilisateur
        req.user = {
            id_utilisateur: user.id_utilisateur,
            role: user.role
        };

        next();

    } catch (error) {
        return res.status(403).json({
            message: 'Token invalide ou expiré.'
        });
    }
};

module.exports = {
    authenticateToken
};
