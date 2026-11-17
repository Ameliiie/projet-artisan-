const express = require('express');
const router = express.Router();

const favoriController = require('../controllers/favori.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Ajouter un artisan aux favoris
router.post(
    '/favoris/:id_artisan',
    authenticateToken,
    authorizeRole('particulier'),
    favoriController.addFavorite
);

// Récupérer les favoris du particulier connecté
router.get(
    '/favoris',
    authenticateToken,
    authorizeRole('particulier'),
    favoriController.getFavorites
);

// Supprimer un artisan des favoris
router.delete(
    '/favoris/:id_artisan',
    authenticateToken,
    authorizeRole('particulier'),
    favoriController.removeFavorite
);

module.exports = router;