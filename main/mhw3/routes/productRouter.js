const { getProductController, addProductController, deleteProductController } = require('../controllers/productController')
const auth = require('../middleware/auth')

module.exports = product = async(fastify) => {
    fastify
        .get('/:id', getProductController)
        .post('/', { preHandler: auth }, addProductController)
        .delete('/:id', { preHandler: auth }, deleteProductController)
}