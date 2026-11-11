const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');
const { getAllArtisans, getArtisanById, getMyArtisanProfile, createMyArtisanProfile, updateMyArtisanProfile } = require('../controllers/artisan.controller');

router.get('/artisans', getAllArtisans);
router.get(
    '/artisans/me',
    authenticateToken, 
    authorizeRole('artisan'),
    getMyArtisanProfile
);

router.post(
    '/artisans/me',
    authenticateToken,
    authorizeRole('artisan'),
    createMyArtisanProfile
);

router.put(
    '/artisans/me',
    authenticateToken,
    authorizeRole('artisan'),
    updateMyArtisanProfile
);

router.get('/artisans/:id', getArtisanById);

module.exports = router;