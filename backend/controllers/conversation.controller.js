
const conversationService = require('../services/conversation.service');

// Envoie un premier message à un artisan
const sendMessage = async (req, res) => {
    try {
        const { id_artisan } = req.params;
        const { contenu } = req.body;
        const id_utilisateur = req.user.id_utilisateur;

        const newMessage = await conversationService.sendMessage(
            id_utilisateur,
            id_artisan,
            contenu
        );

        return res.status(201).json(newMessage);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Récupère les conversations de l'utilisateur connecté
const getUserConversations = async (req, res) => {
    try {
        const id_utilisateur = req.user.id_utilisateur;
        const role = req.user.role;

        const conversations = await conversationService.getUserConversations(
            id_utilisateur,
            role
        );

        return res.status(200).json(conversations);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Récupère une conversation précise
const getConversationById = async (req, res) => {
    try {
        const { id_conversation } = req.params;
        const id_utilisateur = req.user.id_utilisateur;
        const role = req.user.role;

        const conversation = await conversationService.getConversationById(
            id_conversation,
            id_utilisateur,
            role
        );

        return res.status(200).json(conversation);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

// Répond à une conversation existante
const replyToConversation = async (req, res) => {
    try {
    const { id_conversation } = req.params;
    const { contenu } = req.body;
    const id_utilisateur = req.user.id_utilisateur;
    const role = req.user.role;

    const newMessage = await conversationService.replyToConversation(
        id_conversation,
        id_utilisateur,
        role,
        contenu
    );

    return res.status(201).json(newMessage);

} catch (error) {
    return res.status(error.statusCode || 500).json({
        message: error.message
    });
}
};

module.exports = {
    sendMessage,
    getUserConversations,
    getConversationById,
    replyToConversation
}