const jwt = require('jsonwebtoken');

module.exports = auth = (req, res, next) => {
    if (req.method === 'OPTIONS') next()
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) return res.status(401).send({ msg: 'Ошибка авторизации' })
        req.user = jwt.verify(token, process.env.SECRET_KEY)
        console.log(req.user)
        next()
    } catch (err) {
        res.status(401).send({ msg: 'Ошибка авторизации' })
    }
}