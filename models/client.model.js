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
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); // Validation simple pour un numéro de téléphone à 10 chiffres
      },
      message: props => `${props.value} n'est pas un numéro de téléphone valide !`
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);

module.exports = Client;
