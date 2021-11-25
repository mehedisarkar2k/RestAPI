/*
   * Restful API - User Schema
   * Create a RESTful API endpoint for Registering user details and to fetch all the
user details which is present in the database.
   * Mehedi Hasan Sarkar 
    email: mehedisarkar2k@gmail.com
   * Date_23-Nov-y2021
*/

const mongoose = require("mongoose");

/* 
1. FirstName. (String, Min length = 2)
2. LastName. (String, Min length = 2)
3. BirthDate. (Date)
4. EmailID. (String, use regular expression to validate, No white spaces)
5. ContactNumber. (Number, Min length = 10)
6. Address. (String)
*/

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = mongoose.Schema({
  firstName: {
    require: true,
    type: String,
    minLength: 2,
  },
  lastName: {
    require: true,
    type: String,
    minLength: 2,
  },
  birthDate: {
    require: true,
    type: Date,
  },
  emailID: {
    require: true,
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  contactNumber: {
    require: true,
    type: Number,
    min: 1000000000,
  },
  address: {
    require: true,
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
