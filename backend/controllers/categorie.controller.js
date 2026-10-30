const { Categorie } = require('../models/associations');

const getAllCategories = async (req, res) => {
    try{
        const categories = await Categorie.findAll();

        res.status(200).json(categories);

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des catégories', 
            error: error.message
        });
    }
};

module.exports = {
    getAllCategories
};