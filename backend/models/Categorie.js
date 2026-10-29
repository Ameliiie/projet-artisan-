const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categorie = sequelize.define(
    'Categorie',
    {
        id_categorie: {
            type: DataTypes.INTEGER.UNSIGNED, 
            primaryKey: true,
            autoIncrement: true
        },
        categorie: {
            type:DataTypes.STRING(100),
            allowNull: false,
            unique: true

        }
    },
    {
        tableName: 'Categorie',
        timestamps: false
    }
);

module.exports = Categorie;