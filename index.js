/*
   * Restful API
   * Create a RESTful API endpoint for Registering user details and to fetch all the
user details which is present in the database.
   * Mehedi Hasan Sarkar 
    email: mehedisarkar2k@gmail.com
   * Date_23-Nov-y2021
*/

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

// imports routes
const userRoute = require("./routes/user");

// use middle wares
app.use(bodyParser.json());
app.use("/users", userRoute);

// connection uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.veqbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// connected to db
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to DB");
  }
);

// routes
app.get("/", (req, res) => {
  res.send("Your are on home page");
});

// listening to the server
app.listen(5000);
