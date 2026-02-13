const mongoose = require("mongoose");
const Question = require("./src/models/Question");
require("dotenv").config();

const questions = require("./questions.json");

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/project_interview_crackers")
  .then(async () => {
    console.log("MongoDB Connected");

    await Question.deleteMany();
    console.log("Old Questions Removed");

    await Question.insertMany(questions);
    console.log(`${questions.length} Questions Inserted Successfully`);

    process.exit();
  })
  .catch(err => {
    console.error("Error seeding:", err);
    process.exit(1);
  });
