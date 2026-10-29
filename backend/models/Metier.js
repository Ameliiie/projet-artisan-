const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Metier =sequelize.define(
    'Metier',
    {
        id_metier:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true, 
            autoIncrement: true
        },

        metier:{
            type:DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        
        id_categorie:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }

        
    },
    {
        tableName: 'Metier',
        timestamps: false
    }
);

module.exports = Metier;