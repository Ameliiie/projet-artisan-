const { Utilisateur } = require('./models/associations');
const bcrypt = require('bcrypt');
const sequelize = require('./config/database');
require('dotenv').config();

const createAdmin = async () => {
    try {
        // Vérifier si un administrateur existe déjà
        const adminExists = await Utilisateur.findOne({
            where: { role: 'admin' }
        });

        if (adminExists) {
            console.log('Un compte administrateur existe déjà.');
            return;
        }

        // Informations du compte administrateur
        const nom = process.env.ADMIN_NOM;
        const prenom = process.env.ADMIN_PRENOM;
        const email = process.env.ADMIN_EMAIL;
        const mot_de_passe = process.env.ADMIN_PASSWORD;

        // Vérification des variables
        if (!nom || !prenom || !email || !mot_de_passe) {
        throw new Error('Les informations administrateur sont manquantes dans le fichier .env');
        }

        // Chiffrer le mot de passe
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        // Créer le compte administrateur
        const admin = await Utilisateur.create({
            nom,
            prenom,
            email,
            mot_de_passe: hashedPassword,
            role: 'admin',
            statut: 'actif'
        });

        console.log('Compte administrateur créé avec succès.');
        console.log('Identifiant :', admin.id_utilisateur);

    } catch (error) {
        console.error('Erreur lors de la création du compte :', error);
    } finally {
        await sequelize.close();
    }
};

createAdmin();