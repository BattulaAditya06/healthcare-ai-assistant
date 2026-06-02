require("dotenv").config();

const app =
require("./src/app");

const authRoutes =
require(
  "./src/routes/authRoutes"
);
app.use(
  "/api/auth",
  authRoutes
);

const cors =
require("cors");

app.use(cors());



const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});