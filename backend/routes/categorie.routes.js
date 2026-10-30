const express = require('express');
const router = express.Router();

const { getAllCategories } = require('../controllers/categorie.controller');

router.get('/categories', getAllCategories);

module.exports = router;
