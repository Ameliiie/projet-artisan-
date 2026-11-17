const express = require('express');
const app = express();

const categorieRoutes = require('./routes/categorie.routes');
const metierRoutes = require('./routes/metier.routes');
const artisanRoutes = require('./routes/artisan.routes');
const utilisateurRoutes = require('./routes/utilisateur.routes');
const authRoutes = require('./routes/auth.routes');
const conversationRoutes = require('./routes/conversation.routes');
const favoriRoutes = require('./routes/favori.routes');

app.use(express.json());

app.use('/api', categorieRoutes);
app.use('/api', metierRoutes);
app.use('/api', artisanRoutes);
app.use('/api', utilisateurRoutes);
app.use('/api', authRoutes);
app.use('/api', conversationRoutes);
app.use('/api', favoriRoutes);

module.exports = app;