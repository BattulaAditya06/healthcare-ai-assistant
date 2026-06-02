const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");

const Symptom = require("../models/Symptom");
const Disease = require("../models/Disease");

const symptoms = require("../datasets/symptoms");
const diseases = require("../datasets/diseases");

const seedData = async () => {
  try {
    await connectDB();

    await Symptom.deleteMany();
    await Disease.deleteMany();

    await Symptom.insertMany(symptoms);
    console.log(diseases);
    await Disease.insertMany(diseases);

    console.log("Database Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedData();