const { body } = require("express-validator");

exports.symptomValidation = [
  body("symptoms")
    .isArray()
    .withMessage("Symptoms must be an array"),
];