const express = require("express");
const router = express.Router();
const ClientController = require("../controllers/ClientController");

module.exports = () => {
  //CREATE
  router.post("/", ClientController.create);

  //READ ALL
  router.get("/", ClientController.getAll);

  //READ ONE
  router.get("/:id", ClientController.getOne);

  //UPDATE
  router.put("/:id", ClientController.edit);

  //DELETE
  router.delete("/:id", ClientController.delete);

  return router;
};
