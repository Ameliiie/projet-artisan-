const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Toutes les routes administrateur nécessitent une authentification et le rôle admin
router.use(authenticateToken, authorizeRole('admin'));

// Récupérer tous les utilisateurs
router.get('/utilisateurs', adminController.getAllUsers);

// Récupérer un utilisateur par son identifiant
router.get('/utilisateurs/:id_utilisateur', adminController.getUserById);

// Récupérer les artisans en attente
router.get('/artisans/en-attente', adminController.getPendingArtisans);

// Récupérer tous les profils artisans
router.get('/artisans', adminController.getAllArtisans);

// Valider ou refuser un artisan
router.put('/artisans/:id_utilisateur/statut', adminController.updateArtisanStatus);

// Désactiver ou réactiver un compte
router.put('/utilisateurs/:id_utilisateur/statut', adminController.updateUserStatus);

// Consulter toutes les demandes de contact
router.get('/demandes-contact', adminController.getAllContactRequests);

// Consulter toutes les demandes de support
router.get('/demandes-support', adminController.getAllSupportRequests);

module.exports = router;