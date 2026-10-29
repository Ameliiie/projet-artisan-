
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Conversation = sequelize.define(
    'Conversation',
    {
        id_conversation: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        id_utilisateur: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        id_artisan: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        tableName: 'Conversation',
        timestamps: false
    }
);

module.exports = Conversation;
