const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users-routes");
const itemsRoutes = require("./routes/items-routes");
const restaurantRoutes = require("./routes/restaurants-routes");
const orderRoutes = require("./routes/orders-routes");

const HttpError = require("./models/http-error");

const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Acces-Control_Allow-Methods", "GET,POST,DELETE,PATCH");

  next();
});
app.use(cors());

app.use("/api/users", usersRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

mongoose
  .connect(
    "mongodb+srv://adrianacoste71:z13zX7jQoKNBSGL5@cluster0.wlaf2yf.mongodb.net/"
  )
  .then(() => {
    console.log("CONNECTED TO DB");
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
