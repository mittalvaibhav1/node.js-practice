const express = require("express");
const http = require("http");
const path = require("path");
const morgan = require("morgan");
const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");

const hostname = "localhost";
const port = 3000;

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

app.use(express.static(path.join(__dirname, "./public")));

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`This server is listening for requests on http://${hostname}:${port}/`);
});
