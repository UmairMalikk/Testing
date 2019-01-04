const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const passport = require("passport");
const flash = require("connect-flash");

const dbPath = require("./config/config").mongoURI;
const user = require("./routes/User");
const app = express();
const port = process.env.port || 8000;

mongoose.connect(
  dbPath,
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database is Connected");
    }
  }
);

require("./config/passport")(passport);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  session({
    secret: "angular-node-connectivity",
    saveUninitialized: true,
    resave: true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set("view engine", "ejs");

require("./routes/User.js")(app, passport);
// app.use("/", (req, res) => {
//   res.send("hello");
//   console.log(req.cookies);
//   console.log("=======================");
//   console.log(req.session);
// });

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is connected on ${port}`);
  }
});
