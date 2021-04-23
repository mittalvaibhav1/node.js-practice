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

dishRouter.route("/:dishId")
.get((req, res) => {
    res.end("Will send the dish with id " + req.params.dishId);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
})
.put((req, res) => {
    res.end("Updated dish with id " + req.params.dishId);
})
.delete((req, res) => {
    res.end("Deleting the dish with id " + req.params.dishId);
});

module.exports =  dishRouter;