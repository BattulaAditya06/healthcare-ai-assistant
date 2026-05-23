const express = require("express");

const helmet = require("helmet");

const rateLimit =
  require("express-rate-limit");


const cors = require("cors");

const sessionRoutes =
  require("./routes/sessionRoutes");

const symptomRoutes =
  require("./routes/symptomRoutes");

const diseaseRoutes =
  require("./routes/diseaseRoutes");

const analyzeRoutes =
  require("./routes/analyzeRoutes");

const app = express();

app.disable("x-powered-by");

// Security middleware
app.use(helmet());

app.use(cors({

  origin:
    "http://localhost:5173",

  methods: [
    "GET",
    "POST",
    "PUT",
    "DELETE"
  ],

  credentials: true
}));

app.use(express.json({
  limit: "10kb"
}));

app.use((req, res, next) => {

  console.log(
    `${req.method} ${req.url}`
  );

  next();
});

app.use((req, res, next) => {

  if (
    req.method === "POST" &&
    !req.is("application/json")
  ) {

    return res.status(400).json({

      success: false,

      message:
        "Only JSON requests are allowed"
    });
  }

  next();
});

app.use((req, res, next) => {

  const sanitize = (obj) => {

    if (!obj) return;

    for (const key in obj) {

      if (
        key.startsWith("$") ||
        key.includes(".")
      ) {

        delete obj[key];
      }

      else if (
        typeof obj[key] === "object"
      ) {

        sanitize(obj[key]);
      }
    }
  };

  sanitize(req.body);

  next();
});

// Rate limiter
const limiter = rateLimit({

  windowMs:
    15 * 60 * 1000,

  max: 100,

  message: {

  success: false,

  message:
    "Too many requests. Please try again later."
}
});

app.use(limiter);

// Routes
app.use(
  "/api/session",
  sessionRoutes
);

app.use(
  "/api/symptoms",
  symptomRoutes
);

app.use(
  "/api/diseases",
  diseaseRoutes
);

app.use(
  "/api/analyze",
  analyzeRoutes
);

// Health route
app.get("/", (req, res) => {

  res.json({
    success: true,
    message:
      "Backend Running Successfully"
  });
});

app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).json({

    success: false,

    message:
      "Internal Server Error"
  });
});

module.exports = app;