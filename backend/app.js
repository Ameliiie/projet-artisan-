const express = require('express');
const app = express();

const categorieRoutes = require('./routes/categorie.routes');
const metierRoutes = require('./routes/metier.routes');
const artisanRoutes = require('./routes/artisan.routes');
const utilisateurRoutes = require('./routes/utilisateur.routes');
const authRoutes = require('./routes/auth.routes');

app.use(express.json());

app.use('/api', categorieRoutes);
app.use('/api', metierRoutes);
app.use('/api', artisanRoutes);
app.use('/api', utilisateurRoutes);
app.use('/api', authRoutes);

module.exports = app;