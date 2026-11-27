const express = require('express');
const router = express.Router();

const historiqueController = require('../controllers/historique.controller');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

// Réserver les routes aux administrateurs
router.use(authenticateToken, authorizeRole('admin'));

// Récupérer l'historique des actions
router.get('/', historiqueController.getAllHistory);

module.exports = router;