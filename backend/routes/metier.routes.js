const express = require('express');
const router = express.Router();

const { getAllMetiers } = require('../controllers/metier.controller');

router.get('/metiers', getAllMetiers);

module.exports = router;
