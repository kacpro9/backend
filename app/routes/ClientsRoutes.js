const express = require("express");
const router = express.Router();
const ClientController = require("../controllers/ClientController");
const authMiddleware = require("../middlewares/AuthMiddleware");

module.exports = () => {
  //CREATE
  router.post("/", authMiddleware, ClientController.create);

  //READ ALL
  router.get("/", authMiddleware, ClientController.getAll);

  //READ ONE
  router.get("/:id", authMiddleware, ClientController.getOne);

  //UPDATE
  router.put("/:id", authMiddleware, ClientController.edit);

  //DELETE
  router.delete("/:id", authMiddleware, ClientController.delete);

  return router;
};
