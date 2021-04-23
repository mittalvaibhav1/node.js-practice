const express = require("express");

const promoRouter = express.Router();

promoRouter.route("/")
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end("Will send all the promos to you.");
})
.post((req, res) => {
    res.end("Promo added: " + req.body.name);
})
.put((req, res) => {
    res.statusCode = 404;
    res.end("PUT operation not supported on /promos");
})
.delete((req, res) => {
    res.end("Deleting all the promos");
});

promoRouter.route("/:promoId")
.get((req, res) => {
    res.end("Will send the promo with id " + req.params.promoId);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /promotions/" + req.params.promoId);
})
.put((req, res) => {
    res.end("Updated promo with id " + req.params.promoId);
})
.delete((req, res) => {
    res.end("Deleting the promo with id " + req.params.promoId);
});

module.exports =  promoRouter;