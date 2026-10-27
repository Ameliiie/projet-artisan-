const app = require('./app')
const sequelize = require('./config/database');

const PORT = 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log('Connexion à MySQL réussie !');

        app.listen(PORT,()=>{
            console.log (`Serveur démarré sur http://localhost:${PORT}`);

        });
    } catch (error) {
        console.error('Impossible de se connecter à MySQL :', error.message);
        process.exit(1);
    }
};

startServer();