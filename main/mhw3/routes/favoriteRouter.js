const auth = require('../middleware/auth')
const { getFavoriteController, addFavoriteController } = require('../controllers/favoriteController')

module.exports = favorites = async(fastify) => {
    fastify.get('/', { preHandler: auth }, getFavoriteController)
        .post('/', { preHandler: auth }, addFavoriteController)
}