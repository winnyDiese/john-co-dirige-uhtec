import mongoose from 'mongoose';

const DestinataireSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    adresse: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Destinataire = mongoose.models.Destinataire || mongoose.model('Destinataire', DestinataireSchema);
export default Destinataire;
