
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Historique = sequelize.define('Historique', {
    id_historique: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_utilisateur: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    action: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date_action: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'historique',
    timestamps: false
});

module.exports = Historique;
