const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  adress: {
    street: { type: String, required: true },
    suite: String,
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
  nip: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Numer NIP musi posiadać dokładnie 10 cyfr"],
  },
});

module.exports = mongoose.model("ClientModel", clientSchema);
