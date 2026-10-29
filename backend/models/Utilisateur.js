
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Utilisateur = sequelize.define(
    'Utilisateur',
    {
        id_utilisateur: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        role: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        mot_de_passe: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },

        nom: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        prenom: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        date_creation: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        
        photo: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    },
    {
        tableName: 'Utilisateur',
        timestamps: false
    }
);

module.exports = Utilisateur;
