require('dotenv').config();
const fastify = require("fastify")();
const PORT = process.env.PORT || 3333;
const client = require("./config");

fastify.addContentTypeParser(
    "application/json", {
        parseAs: "string",
    },
    (req, body, done) => {
        try {
            const json = JSON.parse(body);
            done(null, json);
        } catch (err) {
            err.statusCode = 400;
            done(err, undefined);
        }
    }
)

.register(require("./routes/usersRouter"), {
    prefix: "/api/user",
})

.register(require("./routes/productRouter"), {
    prefix: "/api/products",
})

.register(require("./routes/categoryRouter"), {
    prefix: "/api/category",
})

.register(require("./routes/favoriteRouter"), {
    prefix: "/api/favorite",
})

client.connect(() => {
    fastify.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Server started on port ${PORT}`);
    });
});