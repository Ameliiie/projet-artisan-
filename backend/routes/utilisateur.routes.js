const express = require('express');
const router = express.Router();

const { createUser } = require('../controllers/utilisateur.controller');

router.post('/utilisateurs', createUser);

module.exports = router;