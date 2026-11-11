const express = require('express');
const router = express.Router();

const { createUser, getMyProfile } = require('../controllers/utilisateur.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

router.post('/utilisateurs', createUser);
router.get(
    '/utilisateurs/me',
    authenticateToken,
    authorizeRole('particulier', 'artisan'),
    getMyProfile
);

module.exports = router;