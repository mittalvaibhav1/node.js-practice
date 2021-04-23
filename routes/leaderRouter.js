const express = require("express");

const leaderRouter = express.Router();

leaderRouter.route("/")
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end("Will send all the leaders to you.");
})
.post((req, res) => {
    res.end("leader added: " + req.body.name);
})
.put((req, res) => {
    res.statusCode = 404;
    res.end("PUT operation not supported on /leaders");
})
.delete((req, res) => {
    res.end("Deleting all the leaders");
});

leaderRouter.route("/:leaderId")
.get((req, res) => {
    res.end("Will send the leader with id " + req.params.leaderId);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /leaders/" + req.params.leaderId);
})
.put((req, res) => {
    res.end("Updated leader with id " + req.params.leaderId);
})
.delete((req, res) => {
    res.end("Deleting the leader with id " + req.params.leaderId);
});

module.exports =  leaderRouter;