const express = require("express");

const dishRouter = express.Router();

dishRouter.route("/")
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end("Will send all the dishes to you.");
})
.post((req, res) => {
    res.end("Dish added: " + req.body.name);
})
.put((req, res) => {
    res.statusCode = 404;
    res.end("PUT operation not supported on /dishes");
})
.delete((req, res) => {
    res.end("Deleting all the dishes");
});

module.exports =  dishRouter;