const { Metier, Categorie } = require ('../models/associations')


const getAllMetiers = async (req, res) => {
    try {
        const metiers = await Metier.findAll({
            include: [Categorie]
        });
        res.status(200).json(metiers);
    }catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des métiers', 
            error: error.message
        });
    }
}

module.exports = {
    getAllMetiers
};
