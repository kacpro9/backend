const ClientModel = require("../models/ClientModel.js");

module.exports = {
  create: async (req, res) => {
    try {
      const client = new ClientModel({
        name: req.body.name,
        address: {
          street: req.body.address?.street,
          suite: req.body.address?.suite,
          city: req.body.address?.city,
          zipcode: req.body.address?.zipcode,
        },
        nip: req.body.nip,
      });

      const savedClient = await client.save();

      res.status(201).json({
        message: "Client created successfully",
        client: savedClient,
      });
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(500).json({
        message: "Error while creating client",
        error: error.message,
      });
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const client = await ClientModel.findByIdAndDelete(id);

      if (!client) {
        return res.status(404).json({
          message: "Client not found",
        });
      }

      res.status(200).json({
        id: id,
        delete: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while deleting client",
        error: error.message,
      });
    }
  },

  edit: async (req, res) => {
    try {
      const id = req.params.id;

      const editClient = await ClientModel.findByIdAndUpdate(
        id,
        {
          name: req.body.name,
          address: {
            street: req.body.address?.street,
            suite: req.body.address?.suite,
            city: req.body.address?.city,
            zipcode: req.body.address?.zipcode,
          },
          nip: req.body.nip,
        },
        { new: true, runValidators: true }
      );

      if (!editClient) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.status(200).json({
        message: "Client edited successfully!",
        client: editClient,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while editing client!",
        error: error.message,
      });
    }
  },

  getOne: async (req, res) => {
    const id = req.params.id;
    try {
      const client = await ClientModel.findById(id).populate("actions");

      if (!client) {
        return res.status(404).json({
          message: "Client not found",
        });
      }

      res.status(200).json({
        client: client,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while fetching client",
        error: error.message,
      });
    }
  },

  getAll: async (_req, res) => {
    try {
      const clients = await ClientModel.find();

      res.status(200).json({
        clients: clients,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while fetching clients",
        error: error.message,
      });
    }
  },
};
