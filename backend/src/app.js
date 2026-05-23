const express =
require("express");

const cors =
require("cors");

const morgan =
require("morgan");

const symptomRoutes =
require("./routes/symptomRoutes");

const analyzeRoutes =
require("./routes/analyzeRoutes");

const diseaseRoutes =
require("./routes/diseaseRoutes");

const sessionRoutes =
require("./routes/sessionRoutes");

const healthRoutes =
require("./routes/healthRoutes");

const errorHandler =
require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use(
  "/api/v1/symptoms",
  symptomRoutes
);

app.use(
  "/api/v1/analyze",
  analyzeRoutes
);

app.use(
  "/api/v1/diseases",
  diseaseRoutes
);

app.use(
  "/api/v1/sessions",
  sessionRoutes
);

app.use(
  "/api/v1/health",
  healthRoutes
);

app.use(errorHandler);

module.exports = app;