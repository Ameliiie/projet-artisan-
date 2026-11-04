const express = require('express');
const app = express();

const categorieRoutes = require('./routes/categorie.routes');
const metierRoutes = require('./routes/metier.routes');
const artisanRoutes = require('./routes/artisan.routes');

app.use(express.json());

app.use('/api', categorieRoutes);
app.use('/api', metierRoutes);
app.use('/api', artisanRoutes);
module.exports = app;