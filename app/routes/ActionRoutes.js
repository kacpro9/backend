const express = require("express");
const router = express.Router();
const ActionController = require("../controllers/ActionController");

module.exports = () => {
  // CREATE
  router.post("/:clientId", ActionController.create);

  //DELETE
  router.delete("/:id", ActionController.delete);

  //EDIT
  router.put("/:id", ActionController.edit);

  return router;
};
