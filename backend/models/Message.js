
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define(
    'Message',
    {
        id_message: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        contenu: {
            type: DataTypes.STRING(800),
            allowNull: false
        },

        date_envoi: {
            type: DataTypes.DATE,
            allowNull: false
        },

        id_conversation: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        tableName: 'Message',
        timestamps: false
    }
);

module.exports = Message;
