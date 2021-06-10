const client = require("../config");
const jwt = require("jsonwebtoken");

const loginController = async(req, res) => {
    try {
        const { login, password } = req.body;
        const checkUser = await client.query(
            "SELECT * FROM USERS WHERE LOGIN = $1", [login]
        );

        if (checkUser.rowCount <= 0) return res.send("Пользователь не найден");
        // console.log(checkUser)
        if (password != checkUser.rows[0].password.trim()) {
            return res.send("Неверный пароль");
        }
        const token = await jwt.sign({ user_id: checkUser.rows[0].user_id },
            process.env.SECRET_KEY, { expiresIn: "24h" }
        );
        res.send({
            token
        });
    } catch (error) {}
};

const registerController = async(req, res) => {
    try {
        const { login, password } = req.body;
        const checkUser = await client.query(
            "SELECT * FROM USERS WHERE LOGIN = $1", [login]
        );
        if (checkUser.rowCount > 0) return res.send("Пользователь уже существует");

        await client.query(
            "INSERT INTO USERS(login, password) VALUES($1, $2) RETURNING *", [login, password],
            (err, results) => {
                if (err) return res.send(err)
                res.send({ message: "Аккаунт зарегистрирован" });
            }
        );
    } catch (error) {}
};

module.exports = { loginController, registerController };