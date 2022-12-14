var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
require("dotenv").config();
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var stationRouter = require("./routes/station");
var stationOwnerRouter = require("./routes/stationOwnerRoutes");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/stations", stationRouter);

//base route of the station owner
app.use("/api/owner", stationOwnerRouter);

mongoose
  .connect(process.env.DATABASE_CREDENTIALS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  });

app.listen(3000, function () {
  console.log('Server running on port 3000!');
});
