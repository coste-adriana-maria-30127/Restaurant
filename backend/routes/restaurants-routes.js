const express = require("express");
// const { check } = require("express-validator");

const restaurantsControllers = require("../controllers/restaurants-controllers");

const router = express.Router();

router.get("/", restaurantsControllers.getRestaurants);
router.get("/:rid", restaurantsControllers.getRestaurantById);
router.post("/create", restaurantsControllers.createRestaurant);
router.get("/:rid/items", restaurantsControllers.getItemsRestaurantById);

module.exports = router;
