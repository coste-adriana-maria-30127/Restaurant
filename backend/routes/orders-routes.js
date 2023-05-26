const express = require("express");
// const { check } = require("express-validator");

const ordersControllers = require("../controllers/orders-controllers");

const router = express.Router();

router.get("/", ordersControllers.getOrders);
router.get("/:rid", ordersControllers.getOrderById);
router.post("/create", ordersControllers.createOrder);

module.exports = router;
