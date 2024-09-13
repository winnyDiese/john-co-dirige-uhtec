const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  telephone: {
    type: String,
    required: true,
    unique: true, // Assure que le numéro de téléphone soit unique
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);

module.exports = Client;
