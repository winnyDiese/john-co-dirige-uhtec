import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    montant: {
        type: Number,
        required: true,
    },
    nomBeneficiaire: {
        type: String,
        required: true,
    },
    telBeneficiaire: {
        type: String,
        required: true,
    },
    nomClient: {
        type: String,
        required: true,
    },
    telClient: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
export default Transaction;
