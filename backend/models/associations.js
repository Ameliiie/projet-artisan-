
const Categorie = require('./Categorie');
const Metier = require('./Metier');
const Utilisateur = require('./Utilisateur');
const Artisan = require('./Artisan');
const Favori = require('./Favori');
const Demande_contact = require('./Demande_contact');
const Demande_support = require('./Demande_support');
const Conversation = require('./Conversation');
const Message = require('./Message');



// Une catégorie peut regrouper plusieurs métiers
Categorie.hasMany(Metier, {
    foreignKey: 'id_categorie'
});

// Un métier appartient à une catégorie
Metier.belongsTo(Categorie, {
    foreignKey: 'id_categorie'
});

// Un utilisateur peut avoir un profil artisan
Utilisateur.hasOne(Artisan, {
    foreignKey: 'id_utilisateur'
});

// Un profil artisan appartient à un utilisateur
Artisan.belongsTo(Utilisateur, {
    foreignKey: 'id_utilisateur'
});

// Associations Métier - Artisan

Metier.hasMany(Artisan, {
    foreignKey: 'id_metier'
});

Artisan.belongsTo(Metier, {
    foreignKey: 'id_metier'
});

// Associations Favori 

Utilisateur.hasMany(Favori, {
    foreignKey: 'id_utilisateur'
});

Favori.belongsTo(Utilisateur, {
    foreignKey: 'id_utilisateur'
});

Artisan.hasMany(Favori, {
    foreignKey: 'id_artisan'
});

Favori.belongsTo(Artisan, {
    foreignKey: 'id_artisan'
});

// Association Demande de contact - Artisan et Utilisateur


Utilisateur.hasMany(Demande_contact, {
    foreignKey: 'id_utilisateur'
});

Demande_contact.belongsTo(Utilisateur, {
    foreignKey: 'id_utilisateur'
});

Artisan.hasMany(Demande_contact, {
    foreignKey: 'id_artisan'
});

Demande_contact.belongsTo(Artisan, {
    foreignKey: 'id_artisan'
});

// Demande support et Utilisateur 

Utilisateur.hasMany(Demande_support, {
    foreignKey: 'id_utilisateur'
});

Demande_support.belongsTo(Utilisateur, {
    foreignKey: 'id_utilisateur'
});

// Associations Conversation 

Conversation.hasMany(Message, {
    foreignKey: 'id_conversation'
});

Message.belongsTo(Conversation, {
    foreignKey: 'id_conversation'
});

Utilisateur.hasMany(Conversation, {
    foreignKey: 'id_utilisateur'
});
Conversation.belongsTo(Utilisateur, {
    foreignKey: 'id_utilisateur'
});

Artisan.hasMany(Conversation, {
    foreignKey: 'id_artisan'
});
Conversation.belongsTo(Artisan, {
    foreignKey: 'id_artisan'
});




module.exports = {
    Categorie,
    Metier,
    Utilisateur,
    Artisan, 
    Favori,
    Demande_contact, 
    Demande_support, 
    Conversation,
    Message
};