const express = require("express");
const router = express.Router();
const ActionController = require("../controllers/ActionController");
const authMiddleware = require("../middlewares/AuthMiddleware");

module.exports = () => {
  // CREATE
  router.post("/:clientId", authMiddleware, ActionController.create);

  //DELETE
  router.delete("/:id",authMiddleware, ActionController.delete);

  //EDIT
  router.put("/:id",authMiddleware, ActionController.edit);

  return router;
};
