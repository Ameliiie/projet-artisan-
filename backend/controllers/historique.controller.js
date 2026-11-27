const historiqueService = require('../services/historique.service');

// Récupérer l'historique des actions administratives
const getAllHistory = async (req, res) => {
    try {
        const historiques = await historiqueService.getAllHistory();

        return res.status(200).json(historiques);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllHistory
};