
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Demande_support = sequelize.define(
    'Demande_support',
    {
        id_demande_support: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        objet: {
            type: DataTypes.STRING(125),
            allowNull: false
        },

        message: {
            type: DataTypes.STRING(800),
            allowNull: false
        },

        date_envoi: {
            type: DataTypes.DATE,
            allowNull: false
        },

        id_utilisateur: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        tableName: 'Demande_support',
        timestamps: false
    }
);

module.exports = Demande_support;
