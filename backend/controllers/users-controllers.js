const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find().select("-password"); // concept of protection (or -password)
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const getUserById = async (req, res, next) => {
  console.log(req.body);
  const userId = req.params.uid; // { uid: 'u1' }
  console.log(req);
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user.",
      500
    );
    return next(error);
  }

  if (!user) {
    throw new HttpError("Could not find a user for the provided id.");
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const signup = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your date"));
  }

  const { firstname, lastname, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  console.log(createdUser);

  try {
    console.log(createdUser);
    await createdUser.save(); // return a promise
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signing up failed , please try again.", 500);
    return next(error); // stop code execution if we have an error
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Signing up failed , please try again.", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token }); // remove the _id to make easier to acces the id
};

const login = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError({
      message: "Invalid inputs passed, please check your date.",
    });
  }
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentiales, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentiales, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Logging in failed , please try again.", 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;

  let deletedUser;
  try {
    deletedUser = await User.findById(userId);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not delete user.",
      500
    );
    return next(error);
  }

  try {
    await deletedUser.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user 2.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "User deleted!" });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.deleteUser = deleteUser;
exports.signup = signup;
exports.login = login;
