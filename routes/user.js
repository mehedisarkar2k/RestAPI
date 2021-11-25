/*
   * Restful API - User routes
   * Create a RESTful API endpoint for Registering user details and to fetch all the
user details which is present in the database.
   * Mehedi Hasan Sarkar 
    email: mehedisarkar2k@gmail.com
   * Date_23-Nov-y2021
*/

const express = require("express");
const router = express.Router();
const User = require("../modules/User");

// getting all the User
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ message: err });
  }
});

// adding new User
router.post("/", async (req, res) => {
  const data = req.body;

  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.birthDate,
    emailID: data.emailID,
    contactNumber: data.contactNumber,
    address: data.address,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// getting a user with specific id
router.get("/:userID", async (req, res) => {
  const userID = req.params.userID;

  try {
    const user = await User.findById(userID);

    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete a user with specific id
router.delete("/:userID", async (req, res) => {
  const userID = req.params.userID;

  try {
    const result = await User.remove({ _id: userID });

    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

// update a user with specific id
router.patch("/:userID", async (req, res) => {
  const userID = req.params.userID;
  const user = await User.findById(userID);

  const reqData = req.body;
  const updateData = { ...user };

  const firstName = reqData.firstName
    ? (updateData.firstName = reqData.firstName)
    : updateData.firstName;

  const lastName = reqData.lastName
    ? (updateData.lastName = reqData.lastName)
    : updateData.lastName;

  const birthDate = reqData.birthDate
    ? (updateData.birthDate = reqData.birthDate)
    : updateData.birthDate;

  const emailID = reqData.emailID
    ? (updateData.emailID = reqData.emailID)
    : updateData.emailID;

  const contactNumber = reqData.contactNumber
    ? (updateData.contactNumber = reqData.contactNumber)
    : updateData.contactNumber;

  const address = reqData.address
    ? (updateData.address = reqData.address)
    : updateData.address;

  try {
    const result = await User.updateOne(
      { _id: userID },
      {
        $set: {
          firstName,
          lastName,
          birthDate,
          emailID,
          contactNumber,
          address,
        },
      }
    );

    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
