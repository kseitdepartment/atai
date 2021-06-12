const client = require('../config')

const getCategoryController = async(req, res) => {
    try {
        await client.query(`SELECT C.CATEGORY_ID, C.NAME, COUNT (P.PRODUCT_ID) as PRODUCTS_QUANTITY 
        FROM CATEGORIES C LEFT JOIN PRODUCTS P ON P.CATEGORY_ID = C.CATEGORY_ID 
        GROUP BY  C.CATEGORY_ID ORDER BY C.CATEGORY_ID ASC`,
            (err, result) => {
                if (err) return res.send('Ошибка')
                res.send({ categories: result.rows })
            })
    } catch (err) {
        res.send('Ошибка')
    }
}

module.exports = { getCategoryController }
