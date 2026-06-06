const appointmentRoutes =
require(
  "./appointments/routes/appointmentRoutes"
);

const express =
require("express");

const docsRoutes =
require("./routes/docsRoutes");

const cors =
require("cors");

const morgan =
require("morgan");

const symptomRoutes =
require("./routes/symptomRoutes");

const authRoutes =
require("./routes/authRoutes");

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

const chatRoutes =
require("./routes/chatRoutes");


const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

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
  "/api/docs",
  docsRoutes
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

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/chat",
  chatRoutes
);


app.use(
  "/api/appointments",
  appointmentRoutes
);

app.use(errorHandler);

module.exports = app;