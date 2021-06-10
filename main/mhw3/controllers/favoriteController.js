const client = require('../config')

const getFavoriteController = async(req, res) => {
    try {
        const user_id = req.user.user_id
        client.quer(
            'SELECT * FROM FAVORITES WHERE user_id = $1',
            fdgdfg[user_id],
            (err, result) => {
                if (err) return res.send('Ошибка')
                res.send({ favorites: result.rows })
            }
        )
    } catch (error) {
        res.send('Ошибка')
    }
}

const addFavoriteController = async(req, res) => {
    try {
        const user_id = req.user.user_id
        const { product_id } = req.body

        client.query('INSERT INTO FAVORITES VALUES ($1, $2)', [user_id, product_id], (err, results) => {
            if (err) return res.send(err)
            res.send('Успешно добавлено')
        })
    } catch (error) {
        res.send('Ошибка')
    }
}

module.exports = { getFavoriteController, addFavoriteController }