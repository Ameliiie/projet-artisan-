const express = require('express');
const router = express.Router();

const demandeSupportController = require('../controllers/demande_support.controller');

const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Envoyer une demande de support
router.post(
    '/demandes-support',
    authenticateToken,
    authorizeRole('particulier', 'artisan'),
    demandeSupportController.createDemandeSupport
);

// Consulter ses propres demandes de support
router.get(
    '/demandes-support',
    authenticateToken,
    authorizeRole('particulier', 'artisan'),
    demandeSupportController.getDemandesSupport
);

module.exports = router;