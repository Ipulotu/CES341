const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send("Sarah Pulotu")
})

module.exports = routes