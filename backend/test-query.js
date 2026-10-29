const { Categorie } = require('./models/associations');
const sequelize = require('./config/database');
const { Metier } = require('./models/associations');

const testQuery = async () => {
    try {
        const categories = await Categorie.findAll({
            include: [Metier]
});

console.log(JSON.stringify(
    categories.map(categorie => categorie.toJSON()),
    null,
    2
));
} catch (error) {
        console.error('Erreur lors de la lecture :', error.message);
    } finally {
        await sequelize.close();
    }
};

testQuery();