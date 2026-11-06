const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Récupère l'en tête authorization envoyé par le client 
    const authHeader = req.headers.authorization;

    // Vérifie que l'en tête existe et extrait le JWT sans le préfixe Bearer
    const token = authHeader && authHeader.split(' ')[1];

    // Vérifie si un token a été transmis par le client.
    if (!token) {
        return res.status(401).json({
            message: 'Authentification requise.'
        });
    }

    // Vérifie la signature et la validité du JWT à l'aide de la clé secrète, puis récupère les données qu'il contient.
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    }
    catch (error) {
        return res.status(403).json({
            message: 'Token invalide ou expiré.'
        });
    }
    next();

};

module.exports = {
    authenticateToken
};