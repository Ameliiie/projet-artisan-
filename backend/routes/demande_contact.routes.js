const express = require('express');
const router = express.Router();

const demandeContactController = require('../controllers/demande_contact.controller');

const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Envoyer une demande de contact à un artisan
router.post(
    '/artisans/:id_artisan/demandes-contact',
    authenticateToken,
    authorizeRole('particulier'),
    demandeContactController.createDemandeContact
);

// Récupérer les demandes envoyées par le particulier
router.get(
    '/demandes-contact/envoyees',
    authenticateToken,
    authorizeRole('particulier'),
    demandeContactController.getDemandesEnvoyees
);

// Récupérer les demandes reçues par l'artisan
router.get(
    '/demandes-contact/recues',
    authenticateToken,
    authorizeRole('artisan'),
    demandeContactController.getDemandesRecues
);

module.exports = router;