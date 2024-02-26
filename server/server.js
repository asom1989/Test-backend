// lägg till port
const port = process.env.PORT || 3005;

// skapa servern
const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

// anslut till databasen
const username = process.env.USER,
  password = process.env.PASSWORD,
  database = process.env.DB;

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.q3t20mc.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`
);

// importera  User Model
const UserModel = require("./models/Users");

// get request
app.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

// post-request för att skapa användare
app.post("/createUser", async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();

  res.json(req.body);
});

app.listen(port, () => {
  console.log("Server Works!!");
});
