const ClientModel = require("../models/'ClientModel.js");

module.exports = {
  create: async (req, res, next) => {
    try {
      const client = new ClientModel({
        name: req.body.name,
        surname: req.body.surname,
        adress: {
          street: req.body.adress?.street,
          suite: req.body.adress?.suite,
          city: req.body.adress?.city,
          zipcode: req.body.adress?.zipcode,
        },
        nip: req.body.nip,
      });

      const savedClient = await client.save();

      res.status(201).json({
        message: "Client created sucessfully",
        client: savedClient,
      });
    } catch (error) {
      res.status(500),
        json({
          message: "Error while creating client",
          error: error.message,
        });
    }
  },

  delete: async (req, res, next) => {
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

  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const editClient = await ClientModel.findByIdAndUpdate(
        id,
        {
          name: req.body.name,
          surname: req.body.surname,
          adress: {
            street: req.body.adress?.street,
            suite: req.body.adress?.suite,
            city: req.body.adress?.city,
            zipcode: req.body.adress?.zipcode,
          },
          nip: req.body.nip,
        },
        { new: true, runValidators: true }
      );

      if (!editClient) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.status(200).json({
        message: "Client edited sucessfully!",
        client: editClient,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while editing client!",
        error: error.message,
      });
    }
  },

  getOne: async (req, res, next) => {
    const id = req.params.id;
    try {
      const client = await ClientModel.findById(id);

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

  getAll: async (req, res, next) => {
    try {
      const clients = await ClientModel.find();

      if (!clients || clients.length === 0) {
        return res.status(404).json({
          message: "No clients found",
        });
      }

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
