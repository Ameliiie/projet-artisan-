const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define(
    'Artisan',
    {
        id_artisan:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement: true
        },
        id_utilisateur:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true
        },

        id_metier:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        nom_entreprise: {
            type:DataTypes.STRING(150),
            allowNull: false,
        },

        adresse_entreprise: {
            type:DataTypes.STRING(255),
            allowNull: false,
        },

        telephone: {
            type:DataTypes.STRING(20),
            allowNull: true,
        },

        description: {
            type:DataTypes.STRING(800),
            allowNull: true,
        },

        site_web: {
            type:DataTypes.STRING(255),
            allowNull: true,
        },

        photo: {
            type:DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: 'Artisan',
        timestamps: false
    }
);

module.exports = Artisan;
