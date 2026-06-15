const express =
require("express");


const cors =
require("cors");

const morgan =
require("morgan");



// =========================
// ROUTES
// =========================

const docsRoutes =
require("./routes/docsRoutes");

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
  require(
    "../src/routes/healthRoutes"
  );

const chatRoutes =
require("./routes/chatRoutes");

const appointmentRoutes =
require(
  "./appointments/routes/appointmentRoutes"
);

// =========================
// MIDDLEWARE
// =========================

const errorHandler =
require(
  "./middleware/errorHandler"
);

// =========================
// APP
// =========================

const app = express();

// =========================
// CORS
// =========================

console.log({

  appointmentRoutes,

  symptomRoutes,

  analyzeRoutes,

  docsRoutes,

  diseaseRoutes,

  sessionRoutes,

  healthRoutes,

  authRoutes,

  chatRoutes

});

app.use(cors({

  origin: [

    "http://localhost:3000",

    "https://healthcare-ai-assistant-pink.vercel.app",

    "https://healthcare-ai-assistant.vercel.app"

  ],

  credentials: true

}));



app.use(
  "/api",
  healthRoutes
);

// =========================
// BODY PARSER
// =========================

app.use(express.json());

// =========================
// LOGGER
// =========================

app.use(
  morgan("dev")
);

// =========================
// ROUTES
// =========================

// APPOINTMENTS

app.use(

  "/api/appointments",

  appointmentRoutes

);

// SYMPTOMS

app.use(

  "/api/v1/symptoms",

  symptomRoutes

);

// ANALYZE

app.use(

  "/api/v1/analyze",

  analyzeRoutes

);

// DOCS

app.use(

  "/api/docs",

  docsRoutes

);

// DISEASES

app.use(

  "/api/v1/diseases",

  diseaseRoutes

);

// SESSIONS

app.use(

  "/api/v1/sessions",

  sessionRoutes

);

// HEALTH

app.use(

  "/api/v1/health",

  healthRoutes

);

// AUTH

app.use(

  "/api/auth",

  authRoutes

);

// CHAT

app.use(

  "/api/chat",

  chatRoutes

);

// =========================
// ERROR HANDLER
// =========================

app.use(
  errorHandler
);

// =========================
// EXPORT
// =========================

module.exports = app;