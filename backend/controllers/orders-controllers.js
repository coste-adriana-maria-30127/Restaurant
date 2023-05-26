// const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const fs = require("fs");
const HttpError = require("../models/http-error");
const Order = require("../models/order");

const getOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find().select(); // concept of protection (or -password)
  } catch (err) {
    const error = new HttpError(
      "Fetching order failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    orders: orders.map((order) => order.toObject({ getters: true })),
  });
};

const getOrderById = async (req, res, next) => {
  const orderId = req.params.rid;
  let order;
  try {
    order = await Order.findById(orderId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a order.",
      500
    );
    return next(error);
  }

  res.json({ order: order.toObject({ getters: true }) });
};

const createOrder = async (req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     console.log(errors);
  //     return next(
  //       new HttpError("Invalid inputs passed, please check your date.", 422)
  //     );
  //   }

  const {
    name,
    address,
    distance,
    standardDeliveryMaximumDistance,
    orderMentions,
    restaurant,
    items,
  } = req.body;

  const createdOrder = new Order({
    name,
    address,
    distance,
    standardDeliveryMaximumDistance,
    orderMentions,
    restaurant,
    items,
  });
  console.log(createdOrder);

  try {
    await createdOrder.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating order failed , please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ order: createdOrder });
};

exports.getOrders = getOrders;
exports.getOrderById = getOrderById;
exports.createOrder = createOrder;
