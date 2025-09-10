const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    street: { type: String, required: true },
    suite: String,
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
  nip: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "NIP must be a 10-digit number"],
  },

  actions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ActionModel",
    },
  ],
});

module.exports = mongoose.model("ClientModel", clientSchema);
