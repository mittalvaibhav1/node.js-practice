const express = require("express");
const http = require("http");
const path = require("path");
const morgan = require("morgan");

const hostname = "localhost";
const port = 3000;

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.all("/dishes", (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get("/dishes", (req, res) => {
    res.end("Will send all the dishes to you.");
});

app.post("/dishes", (req, res) => {
    res.end("Dish added: " + req.body.name);
});

app.put("/dishes", (req, res) => {
    res.statusCode = 404;
    res.end("PUT operation not supported on /dishes");
});

app.delete("/dishes", (req, res) => {
    res.end("Deleting all the dishes");
});

app.get("/dishes/:dishId", (req, res) => {
    res.end("Will send all the dish with id " + req.params.dishId);
});

app.post("/dishes/:dishId", (req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
});

app.put("/dishes/:dishId", (req, res) => {
    res.end("Updated dish with id " + req.params.dishId);
});

app.delete("/dishes/:dishId", (req, res) => {
    res.end("Deleting the dish with id " + req.params.dishId);
});


app.use(express.static(path.join(__dirname, "./public")));

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`This server is listening for requests on http://${hostname}:${port}/`);
});
