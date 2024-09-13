import mongoose from 'mongoose';

const AgentSchema = new mongoose.Schema({
    nom: {
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

const Agent = mongoose.models.Agent || mongoose.model('Agent', AgentSchema);
export default Agent;
