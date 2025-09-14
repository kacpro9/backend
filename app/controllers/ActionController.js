const ActionModel = require("../models/ActionModel");
const ClientModel = require("../models/ClientModel");

module.exports = {
  create: async (req, res) => {
    const clientId = req.params.clientId;
    try {
      const action = new ActionModel({
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        clientId: clientId
      });

      const savedAction = await action.save();

      const updateCustomer = await ClientModel.findByIdAndUpdate(
        clientId,
        {
          $push: { actions: savedAction._id },
        },
        { new: true }
      );

      res.status(201).json({
        message: "Action created successfully",
        action: savedAction,
        updateCustomer: updateCustomer,
      });
    } catch (error) {
      console.error("Error creating action:", error);
      res.status(500).json({
        message: "Error while creating action",
        error: error.message,
      });
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const action = await ActionModel.findByIdAndDelete(id);
      if (!action) {
        return res.status(404).json({
          message: "Action not found",
        });
      }

      res.status(200).json({
        id: id,
        delete: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while deleting action",
        error: error.message,
      });
    }
  },

  edit: async (req, res) => {
    try {
      const id = req.params.id;

      const editAction = await ActionModel.findByIdAndUpdate(
        id,
        {
          name: req.body.name,
          description: req.body.description,
          date: req.body.date,
          clientId: req.body.clientId,
        },
        { new: true }
      );

      if (!editAction) {
        return res.status(404).json({
          message: "Action not found",
        });
      }

      res.status(200).json({
        message: "Action updated successfully",
        action: editAction,
      });
    } catch (error) {
      console.error("Error updating action:", error);
      res.status(500).json({
        message: "Error while updating action",
        error: error.message,
      });
    }
  },
};
