const express = require('express');
const router = express.Router();

const { getAllArtisans, getArtisanById} = require('../controllers/artisan.controller');

router.get('/artisans', getAllArtisans);
router.get('/artisans/:id', getArtisanById);
module.exports = router;