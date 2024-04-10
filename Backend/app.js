const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes"); // Change route to router
const route = require("./Routes/ProfileRoutes");

const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/users", router); // Change route to router
app.use("/regi", route);

mongoose.connect("mongodb+srv://admin:dEUc6939TtMKezRM@cluster0.sepzjhs.mongodb.net/")
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
    try {
        await User.create({
            Firstname,
            Lastname,
            Age,
            Country,
            Email,
            Password,
        });
        res.send({ status: "ok" });
    } catch (err) {
        console.log(err);
        res.send({ status: "err" });
    }
});

// Login
app.post("/login", async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const user = await User.findOne({ Email });
        if (!user) {
            return res.json({ err: "User Not Found" });
        }
        if (user.Password === Password) {
            return res.json({ status: "ok" });
        } else {
            return res.json({ status: "Incorrect Password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Server error" });
    }
});
