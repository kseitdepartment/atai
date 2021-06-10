const { loginController, registerController } = require("../controllers/userController");

module.exports = user = async(fastify, options) => {
    fastify.post('/login', loginController)
        .post('/register', registerController)
};