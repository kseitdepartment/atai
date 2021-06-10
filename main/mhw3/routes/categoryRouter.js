const { getCategoryController } = require('../controllers/categoryController')

module.exports = getCategory = async(fastify) => {
    fastify.get('/', getCategoryController)
}