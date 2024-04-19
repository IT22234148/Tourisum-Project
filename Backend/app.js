const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes"); // Change route to router
const route = require("./Routes/ProfileRoutes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "sdfgadgnjdfvd225()55757hbbhg77ffrtgfrtrftrftrft745{}[[]99b";

const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/users", router); // Change route to router
app.use("/regi", route);

mongoose
  .connect("mongodb+srv://admin:dEUc6939TtMKezRM@cluster0.sepzjhs.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000);
  })
  .catch((err) => console.log(err));

// Call Register Model
require("./Model/Register");
const User = mongoose.model("Register");

app.post("/register", async (req, res) => {
  const { Firstname, Lastname, Age, Country, Email, Password } = req.body;
  const encryptedPassword = await bcrypt.hash(Password, 10);

  try {
    const oldUser = await User.findOne({ Email });
    if (oldUser) {
      return res.status(400).json({ err: "user exists" }); // Return error status
    }
    const newUser = new User({
      Firstname,
      Lastname,
      Age,
      Country,
      Email,
      Password: encryptedPassword,
    });
    await newUser.save();
    res.status(200).json({ status: "ok" }); // Return success status
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error" }); // Return server error status
  }
});

// Login
app.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    // User authenticated, generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "5h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/userdeta", async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;
    User.findById(userId)
      .then((user) => {
        if (user) {
          // Send the response with user data and profile photo path
          res.status(200).json({ status: "ok", data: user });
        } else {
          res.status(404).json({ status: "error", data: "User not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ status: "error", data: err.message });
      });
  } catch (err) {
    console.error(err);
    res.status(401).json({ status: "error", data: "Invalid token" });
  }
});
//updt
app.put("/userdeta", async (req, res) => {
  const { token, updates } = req.body;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (updatedUser) {
      res.status(200).json({ status: "ok", data: updatedUser });
    } else {
      res.status(404).json({ status: "error", data: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", data: err.message });
  }
});

//dlt
app.delete("/userdeta", async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      res.status(200).json({ status: "ok", data: "User deleted successfully" });
    } else {
      res.status(404).json({ status: "error", data: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", data: err.message });
  }
});
