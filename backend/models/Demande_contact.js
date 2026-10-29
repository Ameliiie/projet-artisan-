const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Demande_contact = sequelize.define(
    'Demande_contact',
    {
        id_demande_contact:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        objet: {
            type:DataTypes.STRING(125),
            allowNull: false
        },

        message:{
            type:DataTypes.STRING(800),
            allowNull: false
        },

        date_envoi: {
            type:DataTypes.DATE,
            allowNull: false,
        },
        
        id_utilisateur:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        id_artisan:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    },
    {
        tableName: 'Demande_contact',
        timestamps: false
    }
);

module.exports = Demande_contact;