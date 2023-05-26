// const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const fs = require("fs");
const HttpError = require("../models/http-error");
const Restaurant = require("../models/restaurant");

const getRestaurants = async (req, res, next) => {
  console.log(req);
  let restaurants;
  try {
    restaurants = await Restaurant.find().select(); // concept of protection (or -password)
  } catch (err) {
    const error = new HttpError(
      "Fetching restaurant failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    restaurants: restaurants.map((restaurant) =>
      restaurant.toObject({ getters: true })
    ),
  });
};

const getRestaurantById = async (req, res, next) => {
  const restaurantId = req.params.rid;
  let restaurant;
  try {
    restaurant = await Restaurant.findById(restaurantId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a item.",
      500
    );
    return next(error);
  }

  res.json({ restaurant: restaurant.toObject({ getters: true }) });
};

const createRestaurant = async (req, res, next) => {
  console.log(req);
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     console.log(errors);
  //     return next(
  //       new HttpError("Invalid inputs passed, please check your date.", 422)
  //     );
  //   }

  const {
    name,
    schedule,
    minimumOrder,
    standardDeliveryMaximumDistance,
    standardDeliceryPrice,
    extraDeliveryFee,
    items,
  } = req.body;

  const createdRestaurant = new Restaurant({
    name,
    schedule,
    minimumOrder,
    standardDeliveryMaximumDistance,
    standardDeliceryPrice,
    extraDeliveryFee,
    items,
  });
  console.log(createdRestaurant);

  try {
    await createdRestaurant.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating restaurant failed , please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ restaurant: createdRestaurant });
};

exports.getRestaurants = getRestaurants;
exports.getRestaurantById = getRestaurantById;
exports.createRestaurant = createRestaurant;
