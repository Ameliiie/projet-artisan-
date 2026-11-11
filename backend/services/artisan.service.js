const { Artisan, Metier, Categorie } = require('../models/associations');

// Récupération de tous les artisans avec filtres et pagination
const getAllArtisans = async (filters) => {
    const { metier, categorie, page = 1, limit = 10 } = filters;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
        !Number.isInteger(pageNumber) ||
        !Number.isInteger(limitNumber) ||
        pageNumber < 1 ||
        limitNumber < 1 ||
        limitNumber > 50
    ) {
        const error = new Error('Paramètres de pagination invalides');
        error.statusCode = 400;
        throw error;
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

    return {
        artisans,
        totalArtisans: count,
        totalPages,
        pageActuelle: pageNumber
    };
};

// Récupération de la fiche artisan à partir de l'identifiant utilisateur
const getArtisanProfileByUserId = async (id_utilisateur) => {
    const artisan = await Artisan.findOne({
        where: { id_utilisateur }
    });
    if (!artisan) {
        const error = new Error ('Aucune fiche artisan associée à ce compte');
        error.statusCode = 404;
        throw error;
    }
    return artisan;
    
};

// Récupération d'un artisan à partir de son identifiant
const getArtisanById = async (id) => {
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
        const error = new Error('Artisan introuvable');
        error.statusCode = 404;
        throw error;
    }

    return artisan;
};

// Création de la fiche professionnelle d'un artisan
const createArtisanProfile = async (id_utilisateur, artisanData) => {
    const existingProfile = await Artisan.findOne({
        where: {id_utilisateur}
    });

    if (existingProfile){
        const error = new Error ('Une fiche professionnelle existe déjà pour ce compte');
        error.statusCode= 409;
        throw error;
    }
    const { id_metier, nom_entreprise, adresse_entreprise } = artisanData;

    if (!id_metier || !nom_entreprise?.trim() || !adresse_entreprise?.trim()) {
        const error = new Error('Le métier, le nom de l’entreprise et l’adresse sont obligatoires');
        error.statusCode = 400;
        throw error;
    }
    
    // Vérifier que le métier existe dans la base de données
    const metier = await Metier.findByPk(id_metier);
    if (!metier) {
        const error = new Error('Le métier sélectionné est invalide');
        error.statusCode = 400;
        throw error;
    }

    const newArtisan = await Artisan.create({
        id_utilisateur,
        id_metier,
        nom_entreprise: nom_entreprise.trim(),
        adresse_entreprise: adresse_entreprise.trim(),
        telephone: artisanData.telephone || null,
        description: artisanData.description || null,
        site_web: artisanData.site_web || null,
        photo: artisanData.photo || null
    });

    
return newArtisan;

};

// Modification des informations de la fiche artisan
const updateArtisanProfile = async (id_utilisateur, artisanData = {}) => {
    const artisan = await getArtisanProfileByUserId(id_utilisateur);
    const updatedData = {};

    const allowedFields = [
        'telephone',
        'description',
        'site_web',
        'photo'
    ];

    allowedFields.forEach((field) => {
        if (artisanData[field] !== undefined) {
            updatedData[field] = artisanData[field];
        }
    });

    for (const [field, value] of Object.entries(updatedData)) {
    if (value !== null && typeof value !== 'string') {
        const error = new Error(`Le champ ${field} doit être une chaîne de caractères`);
        error.statusCode = 400;
        throw error;
    }

    if (typeof value === 'string' && value.trim() === '') {
        const error = new Error(`Le champ ${field} ne peut pas être vide`);
        error.statusCode = 400;
        throw error;
    }
    }
   
    if (updatedData.telephone && updatedData.telephone.length > 20) {
    const error = new Error('Le numéro de téléphone ne doit pas dépasser 20 caractères');
    error.statusCode = 400;
    throw error;
    }

    if (updatedData.description && updatedData.description.length > 800) {
    const error = new Error('La description ne doit pas dépasser 800 caractères');
    error.statusCode = 400;
    throw error;
    }

    if (updatedData.site_web && updatedData.site_web.length > 255) {
    const error = new Error('L’adresse du site web ne doit pas dépasser 255 caractères');
    error.statusCode = 400;
    throw error;
    }

    if (updatedData.photo && updatedData.photo.length > 255) {
    const error = new Error('Le chemin de la photo ne doit pas dépasser 255 caractères');
    error.statusCode = 400;
    throw error;
    }


    if (Object.keys(updatedData).length === 0) {
        const error = new Error('Aucune donnée à modifier');
        error.statusCode = 400;
        throw error;
    }

    await artisan.update(updatedData);

    return artisan;
};



module.exports = {
    getAllArtisans,
    getArtisanProfileByUserId,
    getArtisanById,
    createArtisanProfile,
    updateArtisanProfile
};