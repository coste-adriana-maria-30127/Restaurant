const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  // console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization.split("Bearer ")[1]; // Authorization: 'Bearer TOKEN'

    console.log(req.headers.authorization.split("Bearer ")[1]);
    if (!token) {
      throw new HttpError("Authorization failed");
      console.log(token);
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authorization failed", 403);
    return next(error);
  }
};
