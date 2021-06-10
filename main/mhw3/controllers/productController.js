const client = require('../config')

const getProductController = async(req, res) => {
    try {
        const category_id = req.params.id
        let products
        if (category_id) {
            products = await client.query(`SELECT * FROM PRODUCTS WHERE CATEGORY_ID = $1`, [category_id])
            return res.send({ products: products.rows })
        } else {
            products = await client.query(`SELECT * FROM PRODUCTS`)
            res.send({ products: products.rows })
        }
    } catch (error) {
        res.send('Send Error')
    }
}

const addProductController = async(req, res) => {
    try {
        const { category_id, name } = req.body
        await client.query(`
        INSERT INTO PRODUCTS (CATEGORY_ID, NAME)
        VALUES($1, $2)`, [category_id, name], (err, results) => {
            if (err) return res.send(err)
            return res.send('Продукт добавлен')
        })
    } catch (error) {
        res.send('Ошибка удаления продукта')
    }
}

const deleteProductController = async(req, res) => {
    try {
        await client.query('DELETE FROM PRODUCTS WHERE product_id = $1', [req.params.id], (err) => {
            if (err) return res.send(err)
            res.send('Успешно удалено')
        })
    } catch (error) {

    }
}

module.exports = { getProductController, addProductController, deleteProductController }