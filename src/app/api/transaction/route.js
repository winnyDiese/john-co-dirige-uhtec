import dbConnect from '../../../../utils/dbConnect';
import Transaction from '../../../../models/transaction.model'; // Remplacez par le chemin correct de votre modèle Transaction
import { NextResponse } from 'next/server';

await dbConnect();

export async function GET() {
    try {
        // Récupérer toutes les transactions depuis la base de données
        const transactions = await Transaction.find().sort({ createdAt: 'desc' });
        return NextResponse.json({ transactions }, { status: 200 });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ message: 'Error fetching transactions' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        // Extraire les données du corps de la requête
        const { montant, nomBeneficiaire, telBeneficiaire, nomClient, telClient, description } = await req.json();

        // Créer une nouvelle transaction avec les données reçues
        const newTransaction = await Transaction.create({
            montant,
            nomBeneficiaire,
            telBeneficiaire,
            nomClient,
            telClient,
            description,
        });

        // Répondre avec un message de succès et la nouvelle transaction créée
        return NextResponse.json({ message: 'Transaction added successfully!', transaction: newTransaction }, { status: 201 });
    } catch (error) {
        console.error('Error adding transaction:', error);
        return NextResponse.json({ message: "Error adding transaction" }, { status: 500 });
    }
}

