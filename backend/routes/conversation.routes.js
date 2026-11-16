const express = require('express');
const router = express.Router();

const conversationController = require('../controllers/conversation.controller');

const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Initier une conversation : particulier uniquement
router.post(
    '/artisans/:id_artisan/contact',
    authenticateToken,
    authorizeRole('particulier'),
    conversationController.sendMessage
);

// Récupérer ses conversations
router.get(
    '/conversations',
    authenticateToken,
    authorizeRole('particulier', 'artisan'),
    conversationController.getUserConversations
);

// Consulter une conversation précise
router.get(
    '/conversations/:id_conversation',
    authenticateToken,
    authorizeRole('particulier', 'artisan'),
    conversationController.getConversationById
);

// Répondre à une conversation
router.post(
    '/conversations/:id_conversation/messages',
    authenticateToken,
    authorizeRole('particulier', 'artisan'),
    conversationController.replyToConversation
);

module.exports = router;