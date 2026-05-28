const mongoose =
require("mongoose");

const Disease =
require("../../models/Disease");

const diseases =
require("../datasets/diseases.json");

require("dotenv").config();

const seedDiseases =
async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB Connected"
    );

    await Disease.deleteMany();

    console.log(
      "Old diseases removed"
    );

    await Disease.insertMany(
      diseases
    );

    console.log(
      "Diseases seeded successfully"
    );

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);

  }

};

seedDiseases();