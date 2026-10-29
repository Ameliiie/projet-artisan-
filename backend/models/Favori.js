const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Favori =sequelize.define(
    'Favori',
    {
        id_favori:{
            type:DataTypes.INTEGER.UNSIGNED,
            primaryKey: true, 
            autoIncrement: true
        },

        id_utilisateur:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        id_artisan: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    },
    {
        tableName: 'Favori',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['id_utilisateur','id_artisan'],
                name: 'uq_favori_utilisateur_artisan'
            }
        ]
    }
);

module.exports = Favori;