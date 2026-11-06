const { loginUser } = require('../services/auth.service');

const login = async (req, res) => {
    // Récupère les données envoyées par le front-end
    try {
        const { email, mot_de_passe } = req.body;

        // Appel du service d'authentification
        const result = await loginUser(email, mot_de_passe);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

module.exports = {
    login
};