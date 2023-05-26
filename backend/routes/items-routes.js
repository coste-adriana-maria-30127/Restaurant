const express = require("express");
const { check } = require("express-validator");

const itemsControllers = require("../controllers/items-controllers");

const router = express.Router();

router.get("/", itemsControllers.getItems);
router.get("/:iid", itemsControllers.getItemById);
router.post(
  "/create",
  check("name").not().isEmpty(),
  check("description").not().isEmpty(),
  check("price").not().isEmpty(),
  itemsControllers.createItem
);

module.exports = router;
