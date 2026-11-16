const {Conversation, Message, Utilisateur, Artisan } = require ('../models/associations');

// Envoie un message dans une conversation
const sendMessage = async (id_utilisateur, id_artisan, contenu) => {


    // Vérifie que le message n'est pas vide
    if (typeof contenu !== 'string' || !contenu.trim()) {
        const error = new Error('Le message ne peut pas être vide');
        error.statusCode = 400;
        throw error;
    }

    // Vérifie la longueur du message
    if (contenu.trim().length > 800) {
        const error = new Error('Le message ne doit pas dépasser 800 caractères');
        error.statusCode = 400;
        throw error;
    }

    // Récupère ou crée la conversation
    const conversation = await createOrGetConversation(
        id_utilisateur,
        id_artisan
    );

    // Enregistre le message
    const newMessage = await Message.create({
        contenu: contenu.trim(),
        date_envoi: new Date(),
        id_conversation: conversation.id_conversation
    });

    return newMessage;
};

// Crée une conversation ou récupère celle qui existe déjà
const createOrGetConversation = async (id_utilisateur, id_artisan) => {

    // Vérifie que l'utilisateur existe
    const user = await Utilisateur.findByPk(id_utilisateur);

    if (!user) {
        const error = new Error('Utilisateur introuvable');
        error.statusCode = 404;
        throw error;
    }

    // Vérifie que l'artisan existe
    const artisan = await Artisan.findByPk(id_artisan);

    if (!artisan) {
        const error = new Error('Artisan introuvable');
        error.statusCode = 404;
        throw error;
    }

    // Recherche une conversation existante
    const existingConversation = await Conversation.findOne({
        where: {
            id_utilisateur,
            id_artisan
        }
    });

    // Si elle existe, on la retourne
    if (existingConversation) {
        return existingConversation;
    }

    // Sinon, on crée une nouvelle conversation
    const newConversation = await Conversation.create({
        id_utilisateur,
        id_artisan
    });

    return newConversation;
};

// Récupère les conversations de l'utilisateur connecté
const getUserConversations = async (id_utilisateur, role) => {

    let where = {};

    if (role === 'particulier') {
        where.id_utilisateur = id_utilisateur;

    } else if (role === 'artisan') {
        const artisan = await Artisan.findOne({
            where: { id_utilisateur }
        });

        if (!artisan) {
            const error = new Error('Profil artisan introuvable');
            error.statusCode = 404;
            throw error;
        }

        where.id_artisan = artisan.id_artisan;

    } else {
        const error = new Error('Accès non autorisé');
        error.statusCode = 403;
        throw error;
    }

    const conversations = await Conversation.findAll({
        where,
        include: [
            {
                model: Artisan,
                include: [
                    {
                        model: Utilisateur,
                        attributes: ['nom', 'prenom', 'photo']
                    }
                ]
            },
            {
                model: Utilisateur,
                attributes: ['nom', 'prenom', 'photo']
            },
            {
                model: Message,
                separate: true,
                order: [['date_envoi', 'ASC']]
            }
        ],
        order: [['id_conversation', 'DESC']]
    });

    return conversations;
};

const getConversationById = async (id_conversation, id_utilisateur, role) => {
    let where = {};

    if (role === 'particulier') {
    where.id_conversation = id_conversation;
    where.id_utilisateur = id_utilisateur;

    } else if (role === 'artisan') {

        const artisan = await Artisan.findOne({
        where: { id_utilisateur }
    });

    if (!artisan) {
        const error = new Error('Profil artisan introuvable');
        error.statusCode = 404;
        throw error;
    }

    where.id_conversation = id_conversation;
    where.id_artisan = artisan.id_artisan;
    

    } else {
        const error = new Error('Accès non autorisé');
        error.statusCode = 403;
        throw error;
    }

    const conversation = await Conversation.findOne({
    where,
    include: [
        {
            model: Artisan,
            include: [
                {
                    model: Utilisateur,
                    attributes: ['nom', 'prenom', 'photo']
                }
            ]
        },
        {
            model: Utilisateur,
            attributes: ['nom', 'prenom', 'photo']
        },
        {
            model: Message,
            separate: true,
            order: [['date_envoi', 'ASC']]
        }
    ]
    });
    // Vérifie que la conversation existe et appartient à l'utilisateur
    if (!conversation) {
        const error = new Error('Conversation introuvable');
        error.statusCode = 404;
        throw error;
    }

    return conversation;
}

// Envoie un message dans une conversation existante
const replyToConversation = async (id_conversation, id_utilisateur, role, contenu) => {

    // 1. Vérifie que le message n'est pas vide
    if (typeof contenu !== 'string' || !contenu.trim()) {
        const error = new Error('Le message ne peut pas être vide');
        error.statusCode = 400;
        throw error;
    }

    // 2. Vérifie la longueur du message
    if (contenu.trim().length > 800) {
        const error = new Error('Le message ne doit pas dépasser 800 caractères');
        error.statusCode = 400;
        throw error;
    }

    // 3. Vérifie que l'utilisateur a accès à la conversation
    const conversation = await getConversationById(
        id_conversation,
        id_utilisateur,
        role
    );

    // 4. Enregistre le nouveau message
    const newMessage = await Message.create({
        contenu: contenu.trim(),
        date_envoi: new Date(),
        id_conversation: conversation.id_conversation
    });

    return newMessage;
};


module.exports = {
    createOrGetConversation,
    sendMessage, 
    getUserConversations,
    getConversationById,
    replyToConversation
};