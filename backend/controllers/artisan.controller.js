const { Artisan, Metier, Categorie } = require('../models/associations');
const { Op } = require('sequelize');

const getAllArtisans = async (req, res) => {
    // Récupération des artisans avec filtres par métier et catégorie
    try {
        const { metier, categorie, page = 1, limit = 10 } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (
            !Number.isInteger(pageNumber) ||
            !Number.isInteger(limitNumber) ||
            pageNumber < 1 ||
            limitNumber < 1 ||
            limitNumber > 50
        ){

            return res.status(400).json({
            message: 'Paramètres de pagination invalides'
            });
        }
        const where = {};
        const offset = (pageNumber - 1) * limitNumber;

        if (metier) {
            where.id_metier = metier;
        }

        if (categorie) {
            where['$Metier.id_categorie$'] = categorie;
        }   


       const { count, rows: artisans } = await Artisan.findAndCountAll({
    where,
    limit: limitNumber,
    offset,
    include: [
        {
            model: Metier,
            include: [
                {
                    model: Categorie
                }
            ]
        }
    ]
});

        const totalPages = Math.ceil(count / limitNumber);

        res.status(200).json({
            artisans,
            totalArtisans: count,
            totalPages,
            pageActuelle: pageNumber
        });

       

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des artisans',
            error: error.message
        });
    }
};

const getArtisanById = async (req, res) => {
    try {
        const id = req.params.id;

        const artisan = await Artisan.findByPk(id, {
            include: [
                {
                    model: Metier,
                    include: [
                        {
                            model: Categorie
                        }
                    ]
                }
            ]
        });

        if (!artisan) {
            return res.status(404).json({
                message: 'Artisan introuvable'
            });
        }

        res.status(200).json(artisan);

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération de l artisan',
            error: error.message
        });
    }
};

module.exports = {
    getAllArtisans,
    getArtisanById
};