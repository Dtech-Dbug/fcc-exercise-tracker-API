const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//connect db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Database Connected"))
  .catch((err) => console.log(err.message));

//define schemas
let userSchema = Schema({
  username: String,
});

let exerciseSchema = new Schema({
  username: String,
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: String,
});

let logsSchema = new Schema({
  username: String,
  count: Number,
  log: [
    {
      _id: false,
      description: String,
      duration: Number,
      date: String,
    },
  ],
});

let UserModel = model("UserModel", userSchema);
let ExerciseModel = model("ExerciseModel", exerciseSchema);
let LogsModel = model("LogsModel", logsSchema);

//first api route to save users
app.post("/api/users", async (req, res) => {
  let username = req.body.username;
  //save user
  let saveUser = await new UserModel({
    username,
  }).save();

  console.log("user created--", saveUser);
  res.json(saveUser);
});

// route to get all users
app.get("/api/users", async (req, res) => {
  let allUsers = await UserModel.find().select({ __v: 0 }).exec();
  res.json(allUsers);
});

// route to post exercise
app.post("/api/users/:id/exercises", async (req, res) => {
  //get the id from params
  let userId = req.params.id;

  let { description } = req.body;
  let { duration } = req.body;

  // grab date
  let { date } = req.body;
  // if no date passed set today's date
  let formattedDate = date
    ? new Date(date).toDateString()
    : new Date().toDateString();

  //search for that user
  let user = await UserModel.findById({ _id: userId }).exec();
  let { username } = user;
  console.log("exerciseof user---", username);

  //save exercise log
  let saveExercise = await new ExerciseModel({
    username,
    description,
    duration,
    date: formattedDate,
  }).save();

  res.json(saveExercise);
});

//route to GET all exercises based on users
app.get("/api/users/:id/exercises", async (req, res) => {
  let userId = req.params.id;
  // find user
  let user = await UserModel.findById({ _id: userId }).exec();
  let { username } = user;

  //find in execrise schema based on sepcific user
  let getExercises = await ExerciseModel.find({ username }).exec();

  res.json(getExercises);
});

// logs /api/users/:_id/logs
app.get("/api/users/:id/logs", async (req, res) => {
  // find user from id
  let userId = req.params.id;

  let user = await UserModel.findById({ _id: userId }).exec();
  let { username } = user;
  // find exercises of user from Exercise Model
  let userExercises = await ExerciseModel.find({ username })
    .select({ _id: false })
    .exec();

  // store the count of exercises
  let count = userExercises.length;

  // logs is an array of objects
  let logsArray = [];
  userExercises.map((item) => {
    logsArray.push(item);
  });

  //save logs
  let savedLogs = await new LogsModel({
    username,
    count,
    log: userExercises,
  }).save();

  res.json(savedLogs);
});
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
