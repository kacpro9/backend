const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClientModel",
    required: true,
  },
});

module.exports = mongoose.model("ActionModel", actionSchema);
