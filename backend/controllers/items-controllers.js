// const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const fs = require("fs");
const HttpError = require("../models/http-error");
const Item = require("../models/item");

const getItems = async (req, res, next) => {
  let items;
  try {
    items = await Item.find().select(); // concept of protection (or -password)
  } catch (err) {
    const error = new HttpError(
      "Fetching items failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    items: items.map((item) => item.toObject({ getters: true })),
  });
};

const getItemById = async (req, res, next) => {
  const itemId = req.params.iid;
  console.log(itemId);
  let item;
  try {
    item = await Item.findById(itemId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a item.",
      500
    );
    return next(error);
  }

  res.json({ item: item.toObject({ getters: true }) });
};

const createItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your date.", 422)
    );
  }

  const { name, description, price } = req.body;

  const createdItem = new Item({
    name,
    description,
    price,
  });

  try {
    await createdItem.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating item failed , please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ item: createdItem });
};

exports.getItems = getItems;
exports.getItemById = getItemById;
exports.createItem = createItem;
