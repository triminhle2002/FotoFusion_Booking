const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const routes = require("./src/routes");

const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

// parse application/json
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

routes(app);

app.listen(port, hostname, () => {
  console.log(`Server up and running on port ${port}`);
});
